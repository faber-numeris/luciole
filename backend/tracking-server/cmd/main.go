package main

import (
	"log/slog"

	"github.com/faber-numeris/luciole/tracking-server/di"
)

func main() {
	slog.Info("Starting Tracking Server...")

	srv := di.ProvideServer()
	if err := srv.Start(); err != nil {
		panic(err)
	}
}
