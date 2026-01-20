package main

import (
	"github.com/faber-numeris/luciole/tracking-server/di"
)

func main() {

	srv := di.ProvideServer()
	if err := srv.Start(); err != nil {
		panic(err)
	}
}
