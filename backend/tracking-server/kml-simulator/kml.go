package kml_simulator

import "encoding/xml"

// KML represents the root KML element
type KML struct {
	XMLName    xml.Name     `xml:"kml"`
	Document   *Document    `xml:"Document"`
	Placemarks []*Placemark `xml:"Placemark"`
}

// Document represents a KML Document
type Document struct {
	XMLName     xml.Name     `xml:"Document"`
	Name        string       `xml:"name"`
	Description string       `xml:"description"`
	Placemarks  []*Placemark `xml:"Placemark"`
	Folders     []*Folder    `xml:"Folder"`
}

// Folder represents a KML Folder
type Folder struct {
	XMLName     xml.Name     `xml:"Folder"`
	Name        string       `xml:"name"`
	Description string       `xml:"description"`
	Placemarks  []*Placemark `xml:"Placemark"`
}

// Placemark represents a KML Placemark
type Placemark struct {
	XMLName     xml.Name    `xml:"Placemark"`
	Name        string      `xml:"name"`
	Description string      `xml:"description"`
	Point       *Point      `xml:"Point"`
	LineString  *LineString `xml:"LineString"`
	Polygon     *Polygon    `xml:"Polygon"`
}

// Point represents a KML Point
type Point struct {
	XMLName     xml.Name `xml:"Point"`
	Coordinates string   `xml:"coordinates"`
}

// LineString represents a KML LineString
type LineString struct {
	XMLName     xml.Name `xml:"LineString"`
	Coordinates string   `xml:"coordinates"`
}

// Polygon represents a KML Polygon
type Polygon struct {
	XMLName       xml.Name       `xml:"Polygon"`
	OuterBoundary *OuterBoundary `xml:"outerBoundaryIs"`
	InnerBoundary *InnerBoundary `xml:"innerBoundaryIs"`
}

// OuterBoundary represents outer boundary of a polygon
type OuterBoundary struct {
	LinearRing *LinearRing `xml:"LinearRing"`
}

// InnerBoundary represents inner boundary of a polygon
type InnerBoundary struct {
	LinearRing *LinearRing `xml:"LinearRing"`
}

// LinearRing represents a linear ring
type LinearRing struct {
	XMLName     xml.Name `xml:"LinearRing"`
	Coordinates string   `xml:"coordinates"`
}
