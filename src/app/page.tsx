"use client";

import SortInfo from "@/components/sort-info";
import { useSortingController } from "@/hooks/useController";
import { Algorithm, AlgorithmInfo, algorithms } from "@/lib/sorting";
import { useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [arraySize, setArraySize] = useState<number>(50);
  const algorithmInfo = AlgorithmInfo[algorithm];

  const {
    controllerState,
    handleReset,
    handlePlay,
    handleContinue,
    handlePause,
    handleStep,
    handleRandomize,
  } = useSortingController({ canvasRef, arraySize, algorithm });

  const handleOnArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(parseInt(e.target.value, 10));
    handleReset();
  };

  const handleAlgorithm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value as Algorithm);
    handleReset();
  };

  return (
    <div className="m-10 min-h-[90vh] grid grid-cols-8 gap-4">
      <main className="h-full col-span-8 md:col-span-6 flex flex-col items-center justify-center gap-y-4 p-4">
        <canvas className="w-full border-2 shadow-md" ref={canvasRef}></canvas>
        <ul className="flex gap-x-4 flex-wrap items-center justify-center gap-y-2">
          {!controllerState.running ? (
            <li>
              <button
                className="px-4 py-2 border-2 rounded-md"
                onClick={handlePlay}
              >
                Play
              </button>
            </li>
          ) : !controllerState.paused ? (
            <li>
              <button
                className="px-4 py-2 border-2 rounded-md"
                onClick={handlePause}
              >
                Pause
              </button>
            </li>
          ) : (
            <li>
              <button
                className="px-4 py-2 border-2 rounded-md"
                onClick={handleContinue}
              >
                Continue
              </button>
            </li>
          )}
          <li>
            <button
              className="px-4 py-2 border-2 rounded-md"
              onClick={handleStep}
            >
              Step
            </button>
          </li>
          <li>
            <button
              className="px-4 py-2 border-2 rounded-md"
              onClick={handleReset}
            >
              Reset
            </button>
          </li>
          <li>
            <button
              className="px-4 py-2 border-2 rounded-md"
              onClick={handleRandomize}
            >
              Shuffle
            </button>
          </li>
          <select
            onChange={handleAlgorithm}
            value={algorithm}
            className="px-4 py-2 border-2 rounded-md"
          >
            {algorithms.map((value, index) => (
              <option value={value} key={`id-${value}-${index}`}>
                {value.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 items-center">
            <label htmlFor="array size">Number of items (N):</label>
            <input
              onChange={handleOnArraySizeChange}
              value={arraySize}
              className="px-4 py-2 border-2 rounded-md"
              type="number"
            />
          </div>
        </ul>
      </main>
      <SortInfo {...algorithmInfo} />
    </div>
  );
}
