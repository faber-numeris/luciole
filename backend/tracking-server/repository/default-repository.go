package repository

import (
	"context"

	"github.com/faber-numeris/luciole/tracking-server/model"
	"github.com/faber-numeris/luciole/tracking-server/tools/types"
)

var _ Interface = (*DefaultRepository)(nil)

type DefaultRepository struct {
}

func (d DefaultRepository) FetchData(ctx context.Context, clientID types.ULID) (model.Position, error) {
	panic("implement me")
}

func NewDefaultRepository() *DefaultRepository {
	return &DefaultRepository{}
}
