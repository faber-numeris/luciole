package repository

import (
	"context"

	"github.com/faber-numeris/luciole/tracking-server/model"
	"github.com/faber-numeris/luciole/tracking-server/tools/types"
)

type Interface interface {
	FetchData(ctx context.Context, clientID types.ULID) (model.Position, error)
}
