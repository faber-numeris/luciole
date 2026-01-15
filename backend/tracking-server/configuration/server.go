package configuration

type ServerConfigurationInteface interface {
	GetHost() string
	GetPort() int
}

type ServerConfiguration struct {
	Host_ string `env:"HOST" envDefault:"0.0.0.0"`
	Port_ int    `env:"PORT" envDefault:"50051"`
}

func (c *ServerConfiguration) GetHost() string {
	return c.Host_
}

func (c *ServerConfiguration) GetPort() int {
	return c.Port_
}
