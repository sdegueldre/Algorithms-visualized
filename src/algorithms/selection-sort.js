import {swap} from '../utils.js';

export default function* selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i; j < arr.length; j++) {
            min = arr[j] < arr[min] ? j : min;
            yield;
        }
        swap(arr, i, min);
    }
}
