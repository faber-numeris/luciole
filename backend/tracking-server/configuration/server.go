package configuration

type ServerConfigurationInterface interface {
	GetHost() string
	GetPort() int
}

type ServerConfiguration struct {
	Host string `env:"HOST" envDefault:"0.0.0.0"`
	Port int    `env:"PORT" envDefault:"50051"`
}

func (c *ServerConfiguration) GetHost() string {
	return c.Host
}

func (c *ServerConfiguration) GetPort() int {
	return c.Port
}
