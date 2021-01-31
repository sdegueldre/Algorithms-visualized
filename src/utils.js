export const debounce = (f, delay) => {
	let prevTimeout;
	return (...args) => {
		clearTimeout(prevTimeout);
		prevTimeout = setTimeout(() => f(...args), delay);
	};
};

export const swap = function* (arr, i, j) {
	yield 'read';
	yield 'read';
    [arr[i], arr[j]] = [arr[j], arr[i]];
	yield 'write';
	yield 'write';
};
