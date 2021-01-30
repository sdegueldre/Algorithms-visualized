export default function* mergeSort(arr, start = 0, stop = arr.length - 1) {
    if (start < stop) {
        const split = Math.floor((start + stop) / 2);
        const firstHalf = mergeSort(arr, start, split);
        const secondHalf = mergeSort(arr, split + 1, stop);
        const merger = merge(arr, start, split, stop);
        while (!firstHalf.next().done) {
            yield;
        }
        while (!secondHalf.next().done) {
            yield;
        }
        while (!merger.next().done) {
            yield;
        }
    }
    yield;
}

function* merge(arr, start, split, stop) {
    const L = arr.slice(start, split + 1);
    L[L.length] = 2;
    const R = arr.slice(split + 1, stop + 1);
    R[R.length] = 2;
    let i = 0, j = 0;
    for (let k = start; k <= stop; k++) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        yield;
    }
    yield;
}
