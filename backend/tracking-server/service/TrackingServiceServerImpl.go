package service

import (
	"log/slog"
	"time"

	v1 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"
	"github.com/faber-numeris/luciole/tracking-server/repository"
	"github.com/faber-numeris/luciole/tracking-server/tools/types"
)

var _ v1.TrackingServiceServer = &TrackingService{}

type TrackingServiceInterface = v1.TrackingServiceServer

type TrackingService struct {
	v1.UnimplementedTrackingServiceServer
	dataRepository repository.Interface
}

func NewTrackingService(dataRepository repository.Interface) *TrackingService {
	return &TrackingService{
		dataRepository: dataRepository,
	}
}

// SubscribeLocation implements the SubscribeLocation method of the TrackingServiceServer interface.
func (s *TrackingService) SubscribeLocation(
	req *v1.SubscribeLocationRequest,
	stream v1.TrackingService_SubscribeLocationServer,
) error {

	slog.Info("Client subscribed to location updates", "request", req)

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	ctx := stream.Context()

	for {
		select {
		case <-ctx.Done():
			slog.Info("client disconnected or context canceled", "err", ctx.Err())
			return ctx.Err()
		case <-ticker.C:

			data, err := s.dataRepository.FetchData(stream.Context(), types.ULID(req.ClientId))
			if err != nil {
				slog.Error("failed to fetch data from repository", "err", err)
			}

			// build/update positions for this tick
			positions := []*v1.Position{
				{
					VehicleId: data.VehicleID,
					Coordinate: &v1.Coordinate{
						Latitude:  data.Latitude,
						Longitude: data.Longitude,
					},
				},
			}

			locationUpdate := &v1.LocationUpdateResponse{
				Positions: positions,
			}

			if err := stream.Send(locationUpdate); err != nil {
				// Send error -> stop streaming
				return err
			}
		}
	}
}
