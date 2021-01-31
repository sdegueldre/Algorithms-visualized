import {swap} from '../utils.js';

/**
 * @param {number[]} arr the array to sort
 * @param {number} [start=0] the start of the range to sort
 * @param {number} [stop=arr.length] the end of the range to sort (excluded)
 * @returns {Generator} A generator that will progressively sort the underlying
 *  array
 */
export default function* quickSort(arr, start = 0, stop = arr.length) {
    if (stop > start + 1) {
        yield 'read';
        const pivot = arr[stop - 1];
        let partition = start;
        for (let j = start; j < stop; j++) {
            yield 'read';
            if (arr[j] <= pivot) {
                yield* swap(arr, partition, j);
                partition++;
            }
        }
        yield* quickSort(arr, start, partition - 1);
        yield* quickSort(arr, partition - 1, stop);
    }
}
