package main

import (
	"log"
	"net"

	v1 "github.com/faber-numeris/luciole/stream/gen"
	"github.com/faber-numeris/luciole/stream/service"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()

	srv := &service.TrackingServiceServerImpl{}

	v1.RegisterTrackingServiceServer(grpcServer, srv)
	log.Println("gRPC server listening on :50051")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
