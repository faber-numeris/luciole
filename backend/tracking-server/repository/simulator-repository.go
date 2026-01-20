package repository

import (
	"context"

	kml_simulator "github.com/faber-numeris/luciole/tracking-server/kml-simulator"
	"github.com/faber-numeris/luciole/tracking-server/model"
	"github.com/faber-numeris/luciole/tracking-server/tools/types"
)

type SimulatorRepository struct {
	currentIndex int
	positions    []model.Position
}

func NewSimulatorRepository() (*SimulatorRepository, error) {
	positions, err := kml_simulator.LoadSimulatedPath()
	if err != nil {
		return nil, err
	}
	return &SimulatorRepository{
		positions: positions,
	}, nil
}

var _ Interface = (*SimulatorRepository)(nil)

func (s SimulatorRepository) FetchData(ctx context.Context, clientID types.ULID) (model.Position, error) {
	pos := s.positions[s.currentIndex]
	s.currentIndex = s.currentIndex + 1

	if s.currentIndex >= len(s.positions) {
		s.currentIndex = 0
	}
	pos.VehicleID = clientID.String()
	return pos, nil
}
