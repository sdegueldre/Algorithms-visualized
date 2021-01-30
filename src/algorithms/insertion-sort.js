/**
 * @param {number[]} arr the array to sort
 * @returns {Generator} A generator that will progressively sort the underlying
 *  array
 */
export default function* insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            yield;
        }
        arr[j + 1] = key;
    }
}
