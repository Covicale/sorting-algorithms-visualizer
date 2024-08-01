export function swap(arr: number[], i: number, j: number): void {
  const aux = arr[i];
  arr[i] = arr[j];
  arr[j] = aux;
}
