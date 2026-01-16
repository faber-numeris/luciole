package kml_simulator

import (
	"archive/zip"
	"bytes"
	_ "embed"
	"encoding/xml"
	"io"
	"strings"
)

//go:embed resources/qc2mtl.kmz
var Qc2MtlKmz []byte

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

func ReadSimPath() (*KML, error) {
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
