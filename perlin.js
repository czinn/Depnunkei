var T_NOISE_GEN = 20287.0
var OCTAVE_NOISE_GEN = 14737.0
var SEED_NOISE_GEN = 21269.0

var perlin = []
perlin.noise = function(t, octave, seed) {
	var n = (T_NOISE_GEN * t + OCTAVE_NOISE_GEN * octave + SEED_NOISE_GEN * seed) & 0x7fffffff;
	n = (n >> 13) ^ n;
	return 1 - ((n * ((n * n * 53849 + 1421737) & 0x7fffffff) + 468185813) & 0x7fffffff) / 1073741824.0;
}

perlin.interpolate = function(a, b, x) {
	var ft = x * Math.PI;
	var f = (1 - Math.cos(ft)) * 0.5;
	return a * (1 - f) + b * f;
}

perlin.inoise = function(x, octave, seed) {
	var intx = Math.floor(x);
	var fracx = x - intx;
	
	var n1 = perlin.noise(intx, octave, seed);
	var n2 = perlin.noise(intx + 1, octave, seed);
	
	return perlin.interpolate(n1, n2, fracx);
}

perlin.pnoise = function(x, persist, octaves, seed) {
	var total = 0;
	
	for(var i = 0; i < octaves; i++) {
		var frequency = Math.pow(2, i);
		var amplitude = Math.pow(persist, i);
		total += perlin.inoise(x * frequency, i, seed) * amplitude;
	}
	
	return total;
}