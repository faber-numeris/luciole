package configuration

import (
	"github.com/caarlos0/env/v11"
	"github.com/faber-numeris/luciole/tracking-server/tools"
)

type AppConfigurationInterface interface {
	ServerConfigurationInterface
}

type AppConfiguration struct {
	ServerConfiguration
}

func NewAppConfiguration() *AppConfiguration {
	appConfig := tools.Must(env.ParseAs[AppConfiguration]())
	return &appConfig
}
