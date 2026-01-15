package server

import (
	"net"
	"sync"
)

type TrackedConn struct {
	net.Conn
	onClose func(net.Conn)
	once    sync.Once
}

func (c *TrackedConn) Close() error {
	c.once.Do(func() {
		if c.onClose != nil {
			c.onClose(c.Conn)
		}
	})
	return c.Conn.Close()
}

type ConnTrackingListener struct {
	net.Listener
	onConnect    func(net.Conn)
	onDisconnect func(net.Conn)
}

func (l *ConnTrackingListener) Accept() (net.Conn, error) {
	c, err := l.Listener.Accept()
	if err != nil {
		return nil, err
	}
	if l.onConnect != nil {
		l.onConnect(c)
	}
	return &TrackedConn{Conn: c, onClose: l.onDisconnect}, nil
}
