package server

import (
	"log"
	"log/slog"
	"net"
	"strconv"

	"github.com/faber-numeris/luciole/tracking-server/configuration"
	v1 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"
	"github.com/faber-numeris/luciole/tracking-server/service"
	"google.golang.org/grpc"
)

type SrvInterface interface {
	Start() error
}

type Server struct {
	config configuration.AppConfigurationInterface
}

func NewServer(configuration configuration.AppConfigurationInterface) SrvInterface {
	return &Server{
		config: configuration,
	}
}

func (s *Server) Start() error {
	slog.Info("Starting SrvInterface")
	address := net.JoinHostPort(s.config.GetHost(), strconv.Itoa(s.config.GetPort()))
	baseListener, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}

	connectionListener := NewConnectionListener(baseListener)
	grpcServer := grpc.NewServer()
	v1.RegisterTrackingServiceServer(grpcServer, &service.TrackingService{})
	slog.Info("Starting gRPC Server", slog.String("address", address))

	if err := grpcServer.Serve(connectionListener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

	return nil
}
