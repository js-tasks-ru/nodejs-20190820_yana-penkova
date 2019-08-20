function sum(a, b) {
	const sum = a + b;

	if (typeof sum === 'number') return sum;
	throw new TypeError('Type error');
}

module.exports = sum;
