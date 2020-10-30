new p5(sketch => {
	const select = document.querySelector('select[name="algorithm"]');
	const playBtn = document.querySelector('#play');
	const pauseBtn = document.querySelector('#pause');
	const resetBtn = document.querySelector('#reset');
	const algorithms = {
		"quick sort": quickSort,
		"heap sort": heapSort,
		"merge sort": mergeSort,
		"selection sort": selectionSort,
		"insertion sort": insertionSort,
	};
	const array = [];
	const barWidth = 1;
	const gap = 0;
	let playing = false;
	let sorter;
	let offsetLeft;

	function setPlayState(state) {
		playing = state;
		playBtn.classList.toggle('d-none', state);
		pauseBtn.classList.toggle('d-none', !state);
	}
	playBtn.addEventListener('click', () => {
		setPlayState(true);
	});
	pauseBtn.addEventListener('click', () => {
		setPlayState(false);
	});
	resetBtn.addEventListener('click', () => {
		setPlayState(false);
		sketch.setup();
	});
	select.addEventListener('change', () => {
		sorter = algorithms[select.value](array);
	});

	sketch.setup = function () {
		sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
		sketch.background(255);
		const numPoints = sketch.floor((sketch.width + gap) / (barWidth + gap));
		array.length = 0;
		for (let i = 0; i < numPoints; i++) {
			array[i] = sketch.random(0, 1);
		}
		const graphWidth = numPoints * barWidth + (numPoints - 1) * gap;
		offsetLeft = sketch.floor((sketch.width - graphWidth) / 2);
		sorter = algorithms[select.value](array);
	};

	sketch.draw = function () {
		sketch.background(255);
		sketch.fill(0);
		sketch.noStroke();
		for (let i = 0; i < array.length; i++) {
			sketch.rect(offsetLeft + i * (barWidth + gap), sketch.height, barWidth, -array[i] * (sketch.height - 1));
		}
		if (playing) {
			for (let i = 0; i < sketch.ceil(array.length / 20); i++) {
				if (sorter.next().done) {
					setPlayState(false);
					sorter = algorithms[select.value](array);
					break;
				}
			}
		}
	};

	function* selectionSort(A) {
		for (let i = 0; i < A.length; i++) {
			let min = i;
			for (let j = i; j < A.length; j++) {
				min = A[j] < A[min] ? j : min;
				yield;
			}
			swap(A, i, min);
		}
	}

	function* insertionSort(A) {
		for (let i = 1; i < A.length; i++) {
			const key = A[i];
			let j = i - 1;
			while (j >= 0 && A[j] > key) {
				A[j + 1] = A[j];
				j--;
				yield;
			}
			A[j + 1] = key;
		}
	}

	function* mergeSort(A, start = 0, stop = A.length - 1) {
		if (start < stop) {
			const split = sketch.floor((start + stop) / 2);
			const firstHalf = mergeSort(A, start, split);
			const secondHalf = mergeSort(A, split + 1, stop);
			const merger = merge(A, start, split, stop);
			while (!firstHalf.next().done) {
				yield;
			}
			while (!secondHalf.next().done) {
				yield;
			}
			while (!merger.next().done) {
				yield;
			}
		}
		yield;
	}

	function* merge(A, start, split, stop) {
		const L = A.slice(start, split + 1);
		L[L.length] = 2;
		const R = A.slice(split + 1, stop + 1);
		R[R.length] = 2;
		let i = 0, j = 0;
		for (let k = start; k <= stop; k++) {
			if (L[i] <= R[j]) {
				A[k] = L[i];
				i++;
			} else {
				A[k] = R[j];
				j++;
			}
			yield;
		}
		yield;
	}

	function* quickSort(A, start = 0, stop = A.length - 1) {
		if (start < stop) {
			const pivot = A[stop];
			let partition = start - 1;
			for (let j = start; j < stop; j++) {
				if (A[j] < pivot) {
					partition++;
					swap(A, partition, j);
				}
				yield;
			}
			swap(A, partition + 1, stop);
			yield;
			const left = quickSort(A, start, partition);
			const right = quickSort(A, partition + 2, stop);
			while (!left.next().done) {
				yield;
			}
			while (!right.next().done) {
				yield;
			}
		}
	}

	function* heapSort(array) {
		const builder = buildMaxHeap(array);
		while (!builder.next().done) {
			yield;
		}
		for (let i = array.length - 1; i >= 0; i--) {
			swap(array, i, 0);
			const maxifier = maxHeapify(array, i, 0);
			while (!maxifier.next().done) {
				yield;
			}
		}
	}

	function checkHeap(heap, index) {
		const right = 2 * (index + 1);
		const left = right - 1;
		let isHeap = true;
		if (right < heap.length) {
			isHeap = (heap[right] <= heap[index] && checkHeap(heap, right));
		}
		if (left < heap.length && isHeap) {
			isHeap = (heap[left] <= heap[index] && checkHeap(heap, left));
		}
		return isHeap;
	}

	function* buildMaxHeap(array) {
		for (let i = sketch.floor(array.length / 2); i >= 0; i--) {
			const maxifier = maxHeapify(array, array.length, i);
			while (!maxifier.next().done) {
				yield;
			}
		}
	}

	function* maxHeapify(A, heapSize, index) {
		const right = 2 * (index + 1);
		const left = right - 1;
		let largest = index;
		if (left < heapSize && A[left] > A[largest]) {
			largest = left;
		}
		if (right < heapSize && A[right] > A[largest]) {
			largest = right;
		}
		if (largest !== index) {
			swap(array, index, largest);
			const maxifier = maxHeapify(A, heapSize, largest);
			while (!maxifier.next().done) {
				yield;
			}
		}
		yield;
	}

	function swap(A, i, j) {
		[A[i], A[j]] = [A[j], A[i]];
	}
});
