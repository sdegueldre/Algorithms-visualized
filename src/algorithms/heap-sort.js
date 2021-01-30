import {swap} from '../utils.js';

export default function* heapSort(arr) {
    const builder = buildMaxHeap(arr);
    while (!builder.next().done) {
        yield;
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        swap(arr, i, 0);
        const maxifier = maxHeapify(arr, i, 0);
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
        // https://github.com/eslint/eslint/issues/13780 Should not be needed here but at the declaration.
        // eslint-disable-next-line no-unused-vars
        isHeap = (heap[left] <= heap[index] && checkHeap(heap, left));
    }
    return isHeap;
}

function* buildMaxHeap(arr) {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
        const maxifier = maxHeapify(arr, arr.length, i);
        while (!maxifier.next().done) {
            yield;
        }
    }
}

function* maxHeapify(arr, heapSize, index) {
    const right = 2 * (index + 1);
    const left = right - 1;
    let largest = index;
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== index) {
        swap(arr, index, largest);
        const maxifier = maxHeapify(arr, heapSize, largest);
        while (!maxifier.next().done) {
            yield;
        }
    }
    yield;
}
