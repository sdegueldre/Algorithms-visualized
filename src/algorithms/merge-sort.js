/**
 * @param {number[]} arr the array to sort
 * @param {number} [start=0] the start of the range to sort
 * @param {number} [stop=arr.length] the end of the range to sort (excluded)
 * @returns {Generator} A generator that will progressively sort the underlying
 *  array
 */
export default function* mergeSort(arr, start = 0, stop = arr.length) {
    if (stop > start + 1) {
        const split = Math.floor((start + stop) / 2);
        yield* mergeSort(arr, start, split);
        yield* mergeSort(arr, split, stop);
        yield* merge(arr, start, split, stop);
    }
}
/**
 * @param {number[]} arr the array containing the sorted ranges to merge
 * @param {number} start the start of the first range to merge
 * @param {number} split the end of the first range and start of the second
 * @param {number} stop the end of the second range to merge
 * @returns {Generator} A generator that will progressively merge the ranges
 *  into the underlying array
 */
function* merge(arr, start, split, stop) {
    for (let i = start; i < stop; i++) {
        yield 'read'; // All reads needed by both slices
    }
    const left = arr.slice(start, split);
    const right = arr.slice(split, stop);
    let i = 0, j = 0;
    for (let k = start; k < stop; k++) {
        yield 'read';
        yield 'read';
        if (j >= right.length || left[i] < right[j]) {
            yield 'read';
            arr[k] = left[i];
            yield 'write';
            i++;
        } else {
            yield 'read';
            arr[k] = right[j];
            yield 'write';
            j++;
        }
    }
}
