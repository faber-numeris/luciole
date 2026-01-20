package di

import (
	"log/slog"

	"github.com/faber-numeris/luciole/tracking-server/configuration"
	"github.com/faber-numeris/luciole/tracking-server/repository"
	"github.com/faber-numeris/luciole/tracking-server/server"
	"github.com/faber-numeris/luciole/tracking-server/service"
)

func ProvideConfiguration() configuration.AppConfigurationInterface {
	slog.Info("Providing Configuration instance via DI...")
	return configuration.NewAppConfiguration()
}

func ProvideTrackingService(dataRepo repository.Interface) service.TrackingServiceInterface {
	slog.Info("Providing TrackingService instance via DI...")
	return service.NewTrackingService(dataRepo)
}

func ProvideServer() server.SrvInterface {
	slog.Info("Providing SrvInterface instance via DI...")
	dataRepo := ProvideRepository(ProvideConfiguration())
	trackingService := ProvideTrackingService(dataRepo)
	return server.NewServer(ProvideConfiguration(), dataRepo, trackingService)
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
