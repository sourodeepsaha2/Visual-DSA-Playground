import { useEffect, useState } from "react";
import { getBubbleSortAnimations } from "../algorithms/bubbleSort";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(25);
  const [isSorting, setIsSorting] = useState(false);

  const generateArray = () => {
    const arr = [];

    for (let i = 0; i < arraySize; i++) {
      arr.push(Math.floor(Math.random() * 350) + 20);
    }

    setArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const bubbleSort = async () => {
    setIsSorting(true);

    const animations = getBubbleSortAnimations(array);
    const tempArray = [...array];

    for (const [i, j] of animations) {
      [tempArray[i], tempArray[j]] = [
        tempArray[j],
        tempArray[i],
      ];

      setArray([...tempArray]);

      await new Promise((resolve) =>
        setTimeout(resolve, speed)
      );
    }

    setIsSorting(false);
  };

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-green-400 mb-2">
        Visual DSA Playground
      </h1>

      <p className="text-green-600 mb-6">
        See Algorithms Think
      </p>

      <div className="bg-zinc-900 p-6 rounded-lg border border-green-500 mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={generateArray}
            disabled={isSorting}
            className="bg-green-500 text-black px-4 py-2 rounded font-semibold disabled:opacity-50"
          >
            Generate Array
          </button>

          <button
            onClick={bubbleSort}
            disabled={isSorting}
            className="bg-green-500 text-black px-4 py-2 rounded font-semibold disabled:opacity-50"
          >
            {isSorting ? "Sorting..." : "Bubble Sort"}
          </button>
        </div>

        <div className="mb-6">
          <label className="text-green-400 block mb-2">
            Speed: {speed} ms
          </label>

          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            disabled={isSorting}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-green-400 block mb-2">
            Array Size: {arraySize}
          </label>

          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            disabled={isSorting}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex items-end h-[450px] gap-[2px] border border-green-500 p-4">
        {array.map((value, index) => (
          <div
            key={index}
            className="bg-green-500 flex-1"
            style={{
              height: `${value}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;