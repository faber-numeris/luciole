package service

import v1 "github.com/faber-numeris/luciole/tracking-server/grpc/tracking/v1"

type TrackingServiceServerImpl struct {
	v1.UnimplementedTrackingServiceServer
}

var _ v1.TrackingServiceServer = &TrackingServiceServerImpl{}

// SubscribeLocation implements the SubscribeLocation method of the TrackingServiceServer interface.
func (s *TrackingServiceServerImpl) SubscribeLocation(
	req *v1.SubscribeLocationRequest,
	stream v1.TrackingService_SubscribeLocationServer,
) error {

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
