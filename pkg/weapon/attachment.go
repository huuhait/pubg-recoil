package weapon

import "strings"

type Attachment string

type Muzzle Attachment
type Grip Attachment

var (
	MuzzleCompensator = Muzzle("compensator")
	VerticalGrip      = Grip("vertical")
)

func (a Attachment) String() string {
	if len(a) == 0 {
		return "EMPTY"
	}

	return strings.ToUpper(string(a))
}
