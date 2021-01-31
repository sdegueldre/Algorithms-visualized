import {swap} from '../utils.js';

/**
 * @param {number[]} arr the array to sort
 * @returns {Generator} A generator that will progressively sort the underlying
 *  array
 */
export default function* selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i; j < arr.length; j++) {
            yield 'read';
            min = arr[j] < arr[min] ? j : min;
        }
        yield* swap(arr, i, min);
    }
}
