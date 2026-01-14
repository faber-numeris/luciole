package main

import (
	"log"
	"net"
	"sync"

	v2 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"
	"github.com/faber-numeris/luciole/tracking-server/service"
	"google.golang.org/grpc"
)

type connTrackingListener struct {
	net.Listener
	onConnect    func(net.Conn)
	onDisconnect func(net.Conn)
}

func (l *connTrackingListener) Accept() (net.Conn, error) {
	c, err := l.Listener.Accept()
	if err != nil {
		return nil, err
	}
	if l.onConnect != nil {
		l.onConnect(c)
	}
	return &trackedConn{Conn: c, onClose: l.onDisconnect}, nil
}

type trackedConn struct {
	net.Conn
	onClose func(net.Conn)
	once    sync.Once
}

func (c *trackedConn) Close() error {
	c.once.Do(func() {
		if c.onClose != nil {
			c.onClose(c.Conn)
		}
	})
	return c.Conn.Close()
}

func main() {
	baseLis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	lis := &connTrackingListener{
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

	v2.RegisterTrackingServiceServer(grpcServer, srv)
	log.Println("gRPC server listening on :50051")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
