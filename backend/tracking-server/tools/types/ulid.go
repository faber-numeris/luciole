package types

import "github.com/oklog/ulid/v2"

type ULID string

func (u ULID) String() string {
	return string(u)
}

func New() ULID {
	u := ulid.Make()
	return ULID(u.String())
}
