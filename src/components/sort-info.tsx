export default function SortInfo({
  url,
  name,
  timeComplexityBest,
  timeComplexityAverage,
  timeComplexityWorst,
  spaceComplexity,
}: any): JSX.Element {
  return (
    <div className="flex flex-col w-full col-span-8 md:col-span-2 gap-y-2 items-center justify-center">
      <a
        target="_blank"
        href={url}
        className="text-xl md:text-3xl font-bold underline"
      >
        {name}
      </a>
      <div>
        <div className="grid grid-cols-2 divide-x-4 text-center border-4 border-b-0 w-full">
          <span className="h-full font-semibold p-2">Best Time Complexity</span>
          <span className="h-full p-2">{timeComplexityBest}</span>
        </div>
        <div className="grid grid-cols-2 divide-x-4 text-center border-4 border-b-0 w-full">
          <span className="h-full font-semibold p-2">
            Average Time Complexity
          </span>
          <span className="h-full p-2">{timeComplexityAverage}</span>
        </div>
        <div className="grid grid-cols-2 divide-x-4 text-center border-4 border-b-0 w-full">
          <span className="h-full font-semibold p-2">
            Worst Time Complexity
          </span>
          <span className="h-full p-2">{timeComplexityWorst}</span>
        </div>
        <div className="grid grid-cols-2 divide-x-4 text-center border-4 w-full">
          <span className="h-full font-semibold p-2">Space Complexity</span>
          <span className="h-full p-2">{spaceComplexity}</span>
        </div>
      </div>
    </div>
  );
}
