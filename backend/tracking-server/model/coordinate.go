package model

import (
	"time"
)

type Position struct {
	VehicleID  string
	Latitude   float64
	Longitude  float64
	SpeedMps   float64
	HeadingDeg float64
	Timestamp  time.Time
}
