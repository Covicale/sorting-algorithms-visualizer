export class SortingVisualizer {
  private ctx: CanvasRenderingContext2D;
  private barsColors = ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#D3D3D3"];

  constructor(canvas: HTMLCanvasElement) {
    const dims = canvas.getBoundingClientRect();
    canvas.width = dims.width;
    canvas.height = dims.height;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private drawBar(
    value: number,
    index: number,
    maxValue: number,
    barWidth: number,
    color?: string
  ) {
    const barHeight = (value / maxValue) * this.ctx.canvas.height;
    const x = index * barWidth;
    const y = this.ctx.canvas.height - barHeight;

    const fillColor = color || this.barsColors[index % this.barsColors.length];
    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(x, y, barWidth, barHeight);
  }

  display(values: number[], selectedBars?: number[]): void {
    this.clearCanvas();
    const barWidth = this.ctx.canvas.width / values.length;

    const maxValue = Math.max(...values);
    values.forEach((value, index) => {
      this.drawBar(value, index, maxValue, barWidth);
    });
    selectedBars?.forEach((index) => {
      this.drawBar(values[index], index, maxValue, barWidth, "green");
    });
  }
}
