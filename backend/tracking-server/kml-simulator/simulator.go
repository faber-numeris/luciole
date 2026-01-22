package kml_simulator

import (
	"archive/zip"
	"bytes"
	_ "embed"
	"encoding/xml"
	"fmt"
	"io"
	"strconv"
	"strings"
	"time"

	"github.com/faber-numeris/luciole/tracking-server/model"
)

//go:embed resources/qc2mtl.kmz
var Qc2MtlKmz []byte

func LoadSimulatedPath() ([]model.Position, error) {
	kml, err := readSimPath()
	if err != nil {
		return nil, err
	}

	if kml != nil {
		var coordinates []model.Position
		for _, placemark := range kml.Document.Placemarks {
			coordStrings := extractCoordinatesFromPlacemark(placemark)
			for _, coordString := range coordStrings {
				if coordString == "" {
					continue
				}
				coord, parseErr := parseCoordinateString(coordString)
				if parseErr != nil {
					return nil, parseErr
				}
				coordinates = append(coordinates, coord)
			}
		}

		return coordinates, nil
	}

	return nil, nil

}

func readKMLBinary(file *zip.File) (string, error) {
	rc, err := file.Open()
	if err != nil {
		return "", err
	}
	defer func(rc io.ReadCloser) { _ = rc.Close() }(rc)
	buf := new(bytes.Buffer)
	_, err = buf.ReadFrom(rc)
	if err != nil {
		return "", err
	}
	return buf.String(), nil
}

func readSimPath() (*KML, error) {
	zr, err := zip.NewReader(bytes.NewReader(Qc2MtlKmz), int64(len(Qc2MtlKmz)))
	if err != nil {
		panic(err)
	}

	for _, file := range zr.File {
		if strings.HasSuffix(file.Name, ".kml") {
			contents, readError := readKMLBinary(file)
			if readError != nil {
				return nil, readError
			}
			var kml KML
			if unmarshalError := xml.Unmarshal([]byte(contents), &kml); unmarshalError != nil {
				return nil, readError
			}

			return &kml, nil
		}

	}

	return nil, nil
}

func extractCoordinatesFromPlacemark(placemark *Placemark) []string {
	if placemark.LineString != nil {
		coords := strings.Replace(placemark.LineString.Coordinates, " ", "", -1)[1:]
		return strings.Split(coords, "\n")[1:]
	}
	return nil
}

func parseCoordinateString(coordString string) (model.Position, error) {
	if coordString == "" {
		return model.Position{}, fmt.Errorf("empty coordinate string")
	}

	parts := strings.Split(coordString, ",")
	if len(parts) < 2 {
		return model.Position{}, fmt.Errorf("invalid coordinate: %q", coordString)
	}

	var longitude, latitude float64
	var err error

	if longitude, err = strconv.ParseFloat(strings.TrimSpace(parts[0]), 64); err != nil {
		return model.Position{}, err
	}
	if latitude, err = strconv.ParseFloat(strings.TrimSpace(parts[1]), 64); err != nil {
		return model.Position{}, err
	}

	return model.Position{
		Latitude:  latitude,
		Longitude: longitude,
		Timestamp: time.Now(),
	}, nil
}
