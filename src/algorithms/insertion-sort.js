/**
 * @param {number[]} arr the array to sort
 * @returns {Generator} A generator that will progressively sort the underlying
 *  array
 */
export default function* insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        yield 'read';
        yield 'read';
        const key = arr[i];
        let j = i - 1;
        yield 'read'; // read in loop condition
        while (j >= 0 && arr[j] > key) {
            yield 'read';
            arr[j + 1] = arr[j];
            yield 'write';
            j--;
            yield 'read'; // read in loop condition
        }
        arr[j + 1] = key;
        yield 'write';
    }
}
