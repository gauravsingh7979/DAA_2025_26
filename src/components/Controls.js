import React from "react";

const Controls = ({
  algorithm,
  algorithms,
  arraySize,
  isSorting,
  onGenerate,
  onSort,
  onStop,
  setAlgorithm,
  setArraySize,
  setSpeed,
  speed
}) => {
  return (
    <div className="controls">
      <label className="control-field">
        <span>Algorithm</span>
        <select
          value={algorithm}
          onChange={(event) => setAlgorithm(event.target.value)}
          disabled={isSorting}
        >
          {Object.entries(algorithms).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className="control-field">
        <span>Array Size: {arraySize}</span>
        <input
          type="range"
          min="15"
          max="70"
          value={arraySize}
          onChange={(event) => setArraySize(Number(event.target.value))}
          disabled={isSorting}
        />
      </label>

      <label className="control-field">
        <span>Animation Speed: {speed}</span>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          disabled={isSorting}
        />
      </label>

      <div className="button-row">
        <button type="button" onClick={onGenerate} disabled={isSorting}>
          Generate Array
        </button>
        <button type="button" onClick={onSort} disabled={isSorting}>
          Start Sorting
        </button>
        <button
          type="button"
          className="button-secondary"
          onClick={onStop}
          disabled={!isSorting}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Controls;
