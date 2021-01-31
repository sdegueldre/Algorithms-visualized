import {swap} from '../utils.js';

/**
 * @param {number[]} arr the array to sort
 * @returns {Generator} A generator that will progressively sort the underlying
 *  array
 */
export default function* heapSort(arr) {
    yield* buildMaxHeap(arr);
    for (let i = arr.length - 1; i >= 0; i--) {
        yield *swap(arr, i, 0);
        yield* maxHeapify(arr, i, 0);
    }
}
/**
 * @param {number[]} arr the array in which to build the heap
 * @returns {Generator} A generator that will progressively build a heap in the
 *  underlying array
 */
function* buildMaxHeap(arr) {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
        yield* maxHeapify(arr, arr.length, i);
    }
}
/**
 * @param {number[]} arr the array to maxHeapify
 * @param {number} heapSize the index of the end of the heap in the array
 * @param {number} index the position from which to maxHeapify
 * @returns {Generator} A generator that will progressively "max-heapify" the
 *  underlying array
 */
function* maxHeapify(arr, heapSize, index) {
    const right = 2 * (index + 1);
    const left = right - 1;
    let largest = index;
    yield 'read';
    yield 'read';
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    yield 'read';
    yield 'read';
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== index) {
        yield* swap(arr, index, largest);
        yield* maxHeapify(arr, heapSize, largest);
    }
}
