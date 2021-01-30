import {debounce} from './utils.js';
import createCanvas from './canvas.js';
import quickSort from './algorithms/quick-sort.js';
import heapSort from './algorithms/heap-sort.js';
import mergeSort from './algorithms/merge-sort.js';
import selectionSort from './algorithms/selection-sort.js';
import insertionSort from './algorithms/insertion-sort.js';

const select = document.querySelector('select[name="algorithm"]');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const resetBtn = document.querySelector('#reset');
const barWidthInput = document.querySelector('input[name="bar-width"]');
const timeStepInput = document.querySelector('label[name="time-step"] > input');
const timeStepDisplay = document.querySelector('label[name="time-step"] > span');
const algorithms = {
	"heap sort": heapSort,
	"merge sort": mergeSort,
	"quick sort": quickSort,
	"selection sort (slow)": selectionSort,
	"insertion sort (slow)": insertionSort,
};
Object.keys(algorithms).forEach(algorithm => {
	const option = document.createElement('option');
	option.value = option.textContent = algorithm;
	select.appendChild(option);
});
const array = [];
const gap = 0;
let barWidth = 1;
let timeStep = .5;
let playing = false;
let sorter;
let offsetLeft;
let sketch;
let simulationTime;

function setPlayState(state) {
	playing = state;
	playBtn.classList.toggle('d-none', state);
	pauseBtn.classList.toggle('d-none', !state);
}
playBtn.addEventListener('click', () => {
	simulationTime = Date.now();
	setPlayState(true);
});
pauseBtn.addEventListener('click', () => {
	setPlayState(false);
});
resetBtn.addEventListener('click', () => {
	setPlayState(false);
	setup();
});
select.addEventListener('change', () => {
	sorter = algorithms[select.value](array);
});
barWidthInput.addEventListener('input', () => {
	barWidth = Math.ceil(2 ** parseFloat(barWidthInput.value));
	setup();
});
timeStepInput.addEventListener('input', () => {
	timeStep = 2 ** parseFloat(timeStepInput.value);
	timeStepDisplay.textContent = `(${timeStep.toFixed(3)}ms)`;
});
const resize = debounce(() => setup(), 200);
window.addEventListener('resize', () => {
	resize();
});

function setup() {
	sketch = createCanvas(window.innerWidth, window.innerHeight);
	sketch.background('white');
	const numPoints = Math.floor((sketch.width + gap) / (barWidth + gap));
	array.length = 0;
	for (let i = 0; i < numPoints; i++) {
		array[i] = Math.random();
	}
	const graphWidth = numPoints * barWidth + (numPoints - 1) * gap;
	offsetLeft = Math.floor((sketch.width - graphWidth) / 2);
	sorter = algorithms[select.value](array);
}

function draw(dt) {
	sketch.background('white');
	sketch.fill('black');
	for (let i = 0; i < array.length; i++) {
		sketch.rect(offsetLeft + i * (barWidth + gap), sketch.height, barWidth, -array[i] * (sketch.height - 1));
	}
	if (playing) {
		simulationTime += timeStep * Math.floor(dt / timeStep);
		for (let i = 0; i < Math.floor(dt / timeStep); i++) {
			if (sorter.next().done) {
				setPlayState(false);
				sorter = algorithms[select.value](array);
				break;
			}
		}
	}
}

function render() {
	draw(Date.now() - simulationTime);
	requestAnimationFrame(render);
}

setup();
render();
