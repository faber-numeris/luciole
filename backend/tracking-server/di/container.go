package di

import (
	"log/slog"

	"github.com/faber-numeris/luciole/tracking-server/configuration"
	"github.com/faber-numeris/luciole/tracking-server/repository"
	"github.com/faber-numeris/luciole/tracking-server/server"
)

func ProvideConfiguration() configuration.AppConfigurationInterface {
	slog.Info("Providing Configuration instance via DI...")
	return configuration.NewAppConfiguration()
}

func ProvideServer() server.SrvInterface {
	slog.Info("Providing SrvInterface instance via DI...")
	dataRepo := ProvideRepository(ProvideConfiguration())
	return server.NewServer(ProvideConfiguration(), dataRepo)
}

func ProvideRepository(datasource configuration.DataSourceConfigurationInterface) repository.Interface {
	slog.Info("Providing Repository instance via DI...")

	if datasource != nil {
		if datasource.IsSimulatorEnabled() {
			slog.Info("Simulator is enabled, providing Simulator Repository")
			var (
				repo repository.Interface
				err  error
			)
			if repo, err = repository.NewSimulatorRepository(); err != nil {
				slog.Error("Failed to create Simulator Repository, falling back to Default Repository", "err", err)
				return repository.NewDefaultRepository()
			}
			return repo
		}
	}
	slog.Info("Providing Default Repository")
	return repository.NewDefaultRepository()

}
