package server

import (
	"crypto/rand"
	"log/slog"
	"net"
	"sync"
	"time"

	"github.com/oklog/ulid/v2"
)

type ConnectionListenerInterface interface {
	GetConnection(id string) net.Conn
	AddConnection(id string, connection net.Conn)
	RemoveConnection(id string)
}

type ConnectionListener struct {
	net.Listener
	mu          sync.RWMutex
	connections map[string]net.Conn
}

func NewConnectionListener(baseListener net.Listener) *ConnectionListener {
	return &ConnectionListener{
		Listener:    baseListener,
		connections: make(map[string]net.Conn),
	}
}

func (cl *ConnectionListener) GetConnection(id string) net.Conn {
	cl.mu.RLock()
	defer cl.mu.RUnlock()
	if conn, exists := cl.connections[id]; exists {
		return conn
	}
	return nil
}

func (cl *ConnectionListener) AddConnection(id string, connection net.Conn) {
	cl.mu.Lock()
	cl.connections[id] = connection
	cl.mu.Unlock()
}

func (cl *ConnectionListener) RemoveConnection(id string) {
	cl.mu.Lock()
	conn, exists := cl.connections[id]
	if !exists {
		cl.mu.Unlock()
		return
	}
	delete(cl.connections, id)
	cl.mu.Unlock()
	if err := conn.Close(); err != nil {
		slog.Error("The connection couldn't be closed", "err", err)
	}
}

func (cl *ConnectionListener) Accept() (net.Conn, error) {
	id, err := ulid.New(ulid.Timestamp(time.Now()), rand.Reader)
	if err != nil {
		return nil, err
	}

	rawconnection, err := cl.Listener.Accept()
	if err != nil {
		if rawconnection != nil {
			_ = rawconnection.Close()
		}
		return nil, err
	}

	connection := &Connection{
		Conn: rawconnection,
		id:   id.String(),
	}
	connection.OnConnect()

	cl.AddConnection(id.String(), connection)

	return connection, nil

}
