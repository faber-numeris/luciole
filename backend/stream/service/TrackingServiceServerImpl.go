package service

import v1 "github.com/faber-numeris/luciole/stream/gen"

type TrackingServiceServerImpl struct {
	v1.UnimplementedTrackingServiceServer
}

var _ v1.TrackingServiceServer = &TrackingServiceServerImpl{}

// SubscribeLocation implements the SubscribeLocation method of the TrackingServiceServer interface.
func (s *TrackingServiceServerImpl) SubscribeLocation(
	req *v1.SubscribeLocationRequest,
	stream v1.TrackingService_SubscribeLocationServer,
) error {
	return nil
}
