import AlgorithmInfoRaw from "@/data/sort-info.json";
import { swap } from "./utils";

export const algorithms = ["bubble", "selection", "insertion"] as const;
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
