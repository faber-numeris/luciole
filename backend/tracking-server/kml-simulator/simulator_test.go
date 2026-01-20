package kml_simulator

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestReadSimPath(t *testing.T) {
	contents, err := readSimPath()
	assert.NoError(t, err)
	assert.NotEmpty(t, contents)
	assert.Equal(t, contents.Document.Name, "Directions from Quebec City Area, QC to Montréal, QC")
}

func TestExtractCoordinatesFromPlacemark(t *testing.T) {
	kml, err := readSimPath()
	require.NoError(t, err)
	assert.NotEmpty(t, kml)

	var lineStringPlacemark *Placemark
	for _, placemark := range kml.Document.Placemarks {
		if placemark.LineString != nil {
			lineStringPlacemark = placemark
			break
		}
	}
	require.NotNil(t, lineStringPlacemark)
	coords := extractCoordinatesFromPlacemark(lineStringPlacemark)
	assert.NotEmpty(t, coords)
	assert.Greater(t, len(coords), 0)
}

func TestParseCoordinateString(t *testing.T) {

	coordStr := "-71.207981,46.813878,0"
	coord, err := parseCoordinateString(coordStr)
	require.NoError(t, err)
	assert.InDelta(t, coord.Latitude, 46.813878, 0.000001)
	assert.InDelta(t, coord.Longitude, -71.207981, 0.000001)
}
