package server

import (
	"log/slog"
	"net"
	"strconv"

	"github.com/faber-numeris/luciole/tracking-server/configuration"
	v1 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"
	"github.com/faber-numeris/luciole/tracking-server/repository"
	"github.com/faber-numeris/luciole/tracking-server/service"
	"google.golang.org/grpc"
)

type SrvInterface interface {
	Start() error
}

type Server struct {
	config         configuration.AppConfigurationInterface
	dataRepository repository.Interface
}

func NewServer(
	configuration configuration.AppConfigurationInterface,
	repo repository.Interface,
) SrvInterface {
	return &Server{
		config:         configuration,
		dataRepository: repo,
	}
}

func (s *Server) Start() error {
	slog.Info("Starting Server")
	address := net.JoinHostPort(s.config.GetHost(), strconv.Itoa(s.config.GetPort()))
	baseListener, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}

	connectionListener := NewConnectionListener(baseListener)
	grpcServer := grpc.NewServer()
	// TODO: create the provider for the service on the DI container and inject it on the server
	srv := service.NewTrackingService(s.dataRepository)
	v1.RegisterTrackingServiceServer(grpcServer, srv)
	slog.Info("Starting gRPC Server", slog.String("address", address))

	if err := grpcServer.Serve(connectionListener); err != nil {
		slog.Error("Failed to start gRPC Server", "err", err)
		return err
	}

	return nil
}
