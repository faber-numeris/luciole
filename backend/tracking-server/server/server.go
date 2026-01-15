package server

import (
	"log"
	"net"

	v1 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"
	"github.com/faber-numeris/luciole/tracking-server/service"
	"google.golang.org/grpc"
)

type Server interface {
	Start() error
}

type Impl struct {
}

func NewServer() Server {
	return &Impl{}
}

func (s *Impl) Start() error {
	baseLis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	lis := &ConnTrackingListener{
		Listener: baseLis,
		onConnect: func(c net.Conn) {
			log.Printf("client connected: %s", c.RemoteAddr())
		},
		onDisconnect: func(c net.Conn) {
			log.Printf("client disconnected: %s", c.RemoteAddr())
		},
	}
	grpcServer := grpc.NewServer()

	srv := &service.TrackingServiceServerImpl{}

	v1.RegisterTrackingServiceServer(grpcServer, srv)
	log.Println("gRPC server listening on :50051")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

	return nil
}
