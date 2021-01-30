import {swap} from '../utils.js';

export default function* quickSort(arr, start = 0, stop = arr.length - 1) {
    if (start < stop) {
        const pivot = arr[stop];
        let partition = start - 1;
        for (let j = start; j < stop; j++) {
            if (arr[j] < pivot) {
                partition++;
                swap(arr, partition, j);
            }
            yield;
        }
        swap(arr, partition + 1, stop);
        yield;
        const left = quickSort(arr, start, partition);
        const right = quickSort(arr, partition + 2, stop);
        while (!left.next().done) {
            yield;
        }
        while (!right.next().done) {
            yield;
        }
    }
}
