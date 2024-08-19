import SortingController from "@/lib/controller";
import { SortingVisualizer } from "@/lib/graphic";
import { Algorithm } from "@/lib/sorting";
import { useEffect, useState } from "react";

interface ControllerState {
  running: boolean;
  paused: boolean;
}

interface UseSortingControllerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  arraySize: number;
  algorithm: Algorithm;
}

interface UseSortingControllerValue {
  controllerState: ControllerState;
  handleReset: () => void;
  handlePlay: () => void;
  handleContinue: () => void;
  handlePause: () => void;
  handleStep: () => void;
  handleRandomize: () => void;
}

export const useSortingController = ({
  canvasRef,
  arraySize,
  algorithm,
}: UseSortingControllerProps): UseSortingControllerValue => {
  const [controller, setController] = useState<SortingController | null>(null);
  const [controllerState, setControllerState] = useState<ControllerState>({
    running: false,
    paused: false,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const visualizer = new SortingVisualizer(canvasRef.current);
      const newController = new SortingController(visualizer, arraySize);
      newController.algorithm = algorithm;
      setController(newController);
    }
  }, [canvasRef, arraySize, algorithm]);

  const handleReset = () => {
    controller?.reset();
    setControllerState({ running: false, paused: false });
  };

  const handlePlay = async () => {
    if (controllerState.running) return;
    setControllerState({ running: true, paused: false });
    await controller?.play();
    setControllerState({ running: false, paused: false });
  };

  const handleContinue = () => {
    controller?.play();
    setControllerState({ running: true, paused: false });
  };

  const handlePause = () => {
    controller?.pause();
    setControllerState({ running: false, paused: true });
  };

  const handleStep = () => {
    controller?.step();
    setControllerState({ running: true, paused: true });
  };

  const handleRandomize = () => {
    controller?.setRandomValues(arraySize);
    handleReset();
  };

  return {
    controllerState,
    handleReset,
    handlePlay,
    handleContinue,
    handlePause,
    handleStep,
    handleRandomize,
  };
};
