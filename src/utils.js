export const debounce = (f, delay) => {
	let prevTimeout;
	return (...args) => {
		clearTimeout(prevTimeout);
		prevTimeout = setTimeout(() => f(...args), delay);
	};
};

export const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};
