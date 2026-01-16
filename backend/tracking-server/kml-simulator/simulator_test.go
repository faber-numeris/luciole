package kml_simulator

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestReadSimPath(t *testing.T) {
	contents, err := ReadSimPath()
	assert.NoError(t, err)
	assert.NotEmpty(t, contents)
	assert.Equal(t, contents.Document.Name, "Directions from Quebec City Area, QC to Montréal, QC")

}
