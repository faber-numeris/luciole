package configuration

type ServerConfigurationInterface interface {
	GetHost() string
	GetPort() int
	IsSimulationMode() bool
}

type ServerConfiguration struct {
	Host           string `env:"HOST" envDefault:"0.0.0.0"`
	Port           int    `env:"PORT" envDefault:"50051"`
	SimulationMode bool   `env:"SIMULATION_MODE" envDefault:"false"`
}

func (c *ServerConfiguration) GetHost() string {
	return c.Host
}

func (c *ServerConfiguration) GetPort() int {
	return c.Port
}

func (c *ServerConfiguration) IsSimulationMode() bool {
	return c.SimulationMode
}
