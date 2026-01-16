package server

import (
	"log/slog"
	"net"
	"sync"
)

type Connection struct {
	net.Conn
	id   string
	once sync.Once
}

func (c *Connection) GetID() string {
	return c.id
}
func (c *Connection) OnConnect() {
	slog.Info(
		"New client connected",
		slog.String("client_id", c.id),
		slog.String("remote_addr", c.Conn.RemoteAddr().String()),
	)
}

func (c *Connection) OnDisconnect() {
	slog.Info(
		"Client disconnected",
		slog.String("client_id", c.id),
		slog.String("remote_addr", c.Conn.RemoteAddr().String()),
	)
}

func (c *Connection) Close() error {
	c.once.Do(func() {
		c.OnDisconnect()
	})
	return c.Conn.Close()
}
