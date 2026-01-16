package main

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func ConnectGRPC(addr string, timeout time.Duration) (*grpc.ClientConn, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	conn, err := grpc.DialContext(ctx, addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		return nil, err
	}
	return conn, nil
}

func main() {
	addr := "localhost:50051"
	conn, err := ConnectGRPC(addr, 5*time.Second)
	if err != nil {
		log.Fatalf("could not connect to %s: %v", addr, err)
	}
	defer conn.Close()

	log.Printf("connected to %s, state=%s", addr, conn.GetState().String())
}
