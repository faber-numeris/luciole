package configuration

type DataSourceConfigurationInterface interface {
	IsSimulatorEnabled() bool
}

type DatasourceConfiguration struct {
	SimulatorEnabled bool `env:"SIMULATION" envDefault:"true"`
}

func (c DatasourceConfiguration) IsSimulatorEnabled() bool {
	return c.SimulatorEnabled
}
