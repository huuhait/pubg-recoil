package weapon

type RecoilOffset struct {
	Interval     int
	DelayIndexes map[int]float64
}

var RecoilOffsets = map[string]RecoilOffset{
	"AKM": {
		Interval: 8,
		DelayIndexes: map[int]float64{
			0:   5,
			450: 7,
		},
	},
	"M416": {
		Interval: 10,
		DelayIndexes: map[int]float64{
			0:   5,
			550: 7.5,
		},
	},
	"AUG": {
		Interval: 8,
		DelayIndexes: map[int]float64{
			0:    5,
			200:  4,
			350:  5,
			450:  8,
			750:  10,
			1000: 8,
		},
	},
	"Beryl": {
		Interval: 8,
		DelayIndexes: map[int]float64{
			0:   6.6,
			350: 7,
			550: 9.5,
		},
	},
	"QBZ": {
		Interval: 10,
		DelayIndexes: map[int]float64{
			0:   3.7,
			450: 7,
		},
	},
	"ACE32": {
		Interval: 10,
		DelayIndexes: map[int]float64{
			0:   6,
			600: 9,
		},
	},
	"G36C": {
		Interval: 10,
		DelayIndexes: map[int]float64{
			0:   4.29,
			150: 4.73,
			250: 5.18,
			350: 6.45,
			480: 6.24,
			550: 7.09,
		},
	},
	"Vector": {
		Interval: 10,
		DelayIndexes: map[int]float64{
			0:   5.5,
			400: 10.5,
		},
	},
	"P90": {
		Interval: 20,
		DelayIndexes: map[int]float64{
			0:   5.5,
			100: 8,
			250: 5,
		},
	},
	"Groza": {
		Interval: 10,
		DelayIndexes: map[int]float64{
			0:   4.2,
			450: 5.6,
			550: 7,
		},
	},
}
