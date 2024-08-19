import AlgorithmInfoRaw from "@/data/sort-info.json";
import { swap } from "./utils";

export const algorithms = [
  "bubble",
  "selection",
  "insertion",
  "heap",
  "quick",
  "merge",
  "radix",
] as const;
export type Algorithm = (typeof algorithms)[number];
export type AlgorithmGenerator = Generator<
  SortingAlgorithmReturn,
  number[],
  SortingAlgorithmReturn
>;
export const AlgorithmInfo: Record<Algorithm, SortingAlgorithmInfo> =
  AlgorithmInfoRaw;

export interface SortingAlgorithmReturn {
  arr: number[];
  selectedBars: number[];
}

interface SortingAlgorithmInfo {
  name: string;
  timeComplexityWorst: string;
  timeComplexityAverage: string;
  timeComplexityBest: string;
  spaceComplexity: string;
  url: string;
}

interface SortingAlgorithmInterface {
  sort(arr: number[]): AlgorithmGenerator;
}

export abstract class SortingAlgorithm implements SortingAlgorithmInterface {
  abstract sort(arr: number[]): AlgorithmGenerator;
}

export class BubbleSort extends SortingAlgorithm {
  public *sort(arr: number[]): AlgorithmGenerator {
    for (let i = 0; i < arr.length - 1; ++i) {
      let swapped = false;
      for (let j = 0; j < arr.length - i - 1; ++j) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
          yield { arr, selectedBars: [j, j + 1] };
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    return arr;
  }
}

export class InsertionSort extends SortingAlgorithm {
  public *sort(arr: number[]): AlgorithmGenerator {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        yield { arr, selectedBars: [i, j] };
        j = j - 1;
      }
      arr[j + 1] = key;
      yield { arr, selectedBars: [i, j + 1] };
    }
    return arr;
  }
}

export class SelectionSort extends SortingAlgorithm {
  public *sort(arr: number[]): AlgorithmGenerator {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        swap(arr, i, minIdx);
        yield { arr, selectedBars: [i, minIdx] };
      }
    }
    return arr;
  }
}

export class HeapSort extends SortingAlgorithm {
  private *heapify(
    arr: number[],
    n: number,
    i: number
  ): Generator<SortingAlgorithmReturn, void, SortingAlgorithmReturn> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      swap(arr, i, largest);
      yield { arr, selectedBars: [i, largest] };
      yield* this.heapify(arr, n, largest);
    }
  }

  public *sort(arr: number[]): AlgorithmGenerator {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      yield* this.heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i);
      yield { arr, selectedBars: [0, i] };
      yield* this.heapify(arr, i, 0);
    }

    return arr;
  }
}

export class QuickSort extends SortingAlgorithm {
  private *partition(
    arr: number[],
    low: number,
    high: number
  ): Generator<SortingAlgorithmReturn, number, SortingAlgorithmReturn> {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
        yield { arr, selectedBars: [i, j] };
      }
    }

    swap(arr, i + 1, high);
    yield { arr, selectedBars: [i + 1, high] };

    return i + 1;
  }

  private *quickSort(
    arr: number[],
    low: number,
    high: number
  ): Generator<SortingAlgorithmReturn, void, SortingAlgorithmReturn> {
    if (low < high) {
      const pi = yield* this.partition(arr, low, high);

      yield* this.quickSort(arr, low, pi - 1);
      yield* this.quickSort(arr, pi + 1, high);
    }
  }

  public *sort(arr: number[]): AlgorithmGenerator {
    yield* this.quickSort(arr, 0, arr.length - 1);
    return arr;
  }
}

export class MergeSort extends SortingAlgorithm {
  private *merge(
    arr: number[],
    l: number,
    m: number,
    r: number
  ): Generator<SortingAlgorithmReturn, void, SortingAlgorithmReturn> {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = arr.slice(l, l + n1);
    const R = arr.slice(m + 1, m + 1 + n2);

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      yield { arr, selectedBars: [l + i, m + 1 + j] };
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      yield { arr, selectedBars: [l + i, m + 1 + j] };
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      yield { arr, selectedBars: [l + i, m + 1 + j] };
      j++;
      k++;
    }
  }

  private *mergeSort(
    arr: number[],
    l: number,
    r: number
  ): Generator<SortingAlgorithmReturn, void, SortingAlgorithmReturn> {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);

      yield* this.mergeSort(arr, l, m);
      yield* this.mergeSort(arr, m + 1, r);

      yield* this.merge(arr, l, m, r);
    }
  }

  public *sort(arr: number[]): AlgorithmGenerator {
    yield* this.mergeSort(arr, 0, arr.length - 1);
    return arr;
  }
}

export class RadixSort extends SortingAlgorithm {
  public *sort(arr: number[]): AlgorithmGenerator {
    const max = Math.max(...arr);
    const n = arr.length;

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      const output = Array(n).fill(0);
      const count = Array(10).fill(0);

      for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
      }

      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        yield { arr, selectedBars: [i] };
      }
    }

    return arr;
  }
}
