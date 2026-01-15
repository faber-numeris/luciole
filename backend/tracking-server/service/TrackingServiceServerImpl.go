package service

import (
	"log/slog"

	v1 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"
)

var _ v1.TrackingServiceServer = &TrackingService{}

type TrackingServiceInterface = v1.TrackingServiceServer

type TrackingService struct {
	v1.UnimplementedTrackingServiceServer
}

func NewTrackingService() TrackingServiceInterface {
	return &TrackingService{}
}

// SubscribeLocation implements the SubscribeLocation method of the TrackingServiceServer interface.
func (s *TrackingService) SubscribeLocation(
	req *v1.SubscribeLocationRequest,
	stream v1.TrackingService_SubscribeLocationServer,
) error {

	slog.Info("Client subscribed to location updates", "request", req)

	positions := make([]*v1.Position, 0)

	positions = append(positions, &v1.Position{
		VehicleId:  "1234",
		Coordinate: &v1.Coordinate{Latitude: 37.7749, Longitude: -122.4194},
	})

	// Example: Send a location update to the client
	locationUpdate := &v1.LocationUpdateResponse{
		Positions: positions,
		// Populate with your location data
	}
	if err := stream.Send(locationUpdate); err != nil {
		return err
	}
	return nil
}
