package di

import (
	"log/slog"

	"github.com/faber-numeris/luciole/tracking-server/configuration"
	"github.com/faber-numeris/luciole/tracking-server/server"
)

func ProvideConfiguration() configuration.AppConfigurationInterface {
	slog.Info("Providing Configuration instance via DI...")
	return configuration.NewAppConfiguration()
}

func ProvideServer() server.SrvInterface {
	slog.Info("Providing SrvInterface instance via DI...")
	return server.NewServer(ProvideConfiguration())
}
