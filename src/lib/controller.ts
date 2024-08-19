import {
  Algorithm,
  AlgorithmGenerator,
  BubbleSort,
  HeapSort,
  InsertionSort,
  MergeSort,
  QuickSort,
  RadixSort,
  SelectionSort,
  SortingAlgorithm,
  SortingAlgorithmReturn,
} from "./sorting";
import { SortingVisualizer } from "./graphic";

export default class SortingController {
  private readonly MAX = 500;
  private readonly MIN = 10;
  private readonly DELAY = 1000;

  private running: boolean = false;
  private gen: AlgorithmGenerator | null = null;

  private values: number[];
  private sortingAlgorithm: SortingAlgorithm;
  private visualizer: SortingVisualizer;

  constructor(visualizer: SortingVisualizer, arraySize: number) {
    this.values = this.getRandomValues(arraySize);
    this.sortingAlgorithm = new BubbleSort();
    this.visualizer = visualizer;
    this.visualizer.display(this.values);
  }

  continue(): void {
    this.running = true;
  }

  pause(): void {
    this.running = false;
  }

  set algorithm(algorithm: Algorithm) {
    switch (algorithm) {
      case "bubble":
        this.sortingAlgorithm = new BubbleSort();
        break;
      case "insertion":
        this.sortingAlgorithm = new InsertionSort();
        break;
      case "selection":
        this.sortingAlgorithm = new SelectionSort();
        break;
      case "heap":
        this.sortingAlgorithm = new HeapSort();
        break;
      case "quick":
        this.sortingAlgorithm = new QuickSort();
        break;
      case "merge":
        this.sortingAlgorithm = new MergeSort();
        break;
      case "radix":
        this.sortingAlgorithm = new RadixSort();
        break;
      default:
        this.sortingAlgorithm = new BubbleSort();
    }
    this.reset();
  }

  private getRandomValues(sizeArray: number): number[] {
    return Array.from(
      { length: sizeArray },
      () => Math.floor(Math.random() * (this.MAX - this.MIN + 1)) + this.MIN
    );
  }

  private async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async step(): Promise<IteratorResult<SortingAlgorithmReturn, number[]>> {
    if (!this.gen) this.gen = this.sortingAlgorithm.sort([...this.values]);
    const current = this.gen.next();
    if (!current.done) {
      const { arr, selectedBars } = current.value;
      this.visualizer.display(arr, selectedBars);
    } else {
      this.gen = null;
    }
    return current;
  }

  reset(): void {
    this.running = false;
    this.visualizer.display(this.values);
    this.gen = this.sortingAlgorithm.sort([...this.values]);
  }

  setRandomValues(arraySize: number): void {
    this.values = this.getRandomValues(arraySize);
    this.visualizer.display(this.values);
    this.gen = this.sortingAlgorithm.sort([...this.values]);
  }

  async drawSorted(sortedValues: number[], delay: number): Promise<void> {
    const currents: number[] = [];
    for (let i = 0; i < sortedValues.length; ++i) {
      currents.push(i);
      this.visualizer.display(sortedValues, currents);
      await this.wait(delay);
    }
  }

  async play(): Promise<void> {
    if (!this.gen) this.gen = this.sortingAlgorithm.sort([...this.values]);
    const delay = this.DELAY / this.values.length;
    this.running = true;
    while (this.running) {
      const current = await this.step();
      if (current.done) {
        this.running = false;
        console.log(current);
        await this.drawSorted(current.value, delay);
        this.gen = null;
        break;
      }
      await this.wait(delay);
    }
  }
}
