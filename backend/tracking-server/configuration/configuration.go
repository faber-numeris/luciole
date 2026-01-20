package configuration

import (
	"github.com/caarlos0/env/v11"
	"github.com/faber-numeris/luciole/tracking-server/tools/utils"
)

type AppConfigurationInterface interface {
	ServerConfigurationInterface
	DataSourceConfigurationInterface
}

type AppConfiguration struct {
	ServerConfiguration
	DatasourceConfiguration
}

func NewAppConfiguration() *AppConfiguration {
	appConfig := utils.Must(env.ParseAs[AppConfiguration]())
	return &appConfig
}
