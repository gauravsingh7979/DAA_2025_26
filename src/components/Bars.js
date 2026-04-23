import React from "react";

const Bars = ({ array, activeIndices, sortedIndices }) => {
  const activeSet = new Set(activeIndices);
  const sortedSet = new Set(sortedIndices);

  return (
    <div className="bars-container">
      {array.map((value, index) => {
        const className = sortedSet.has(index)
          ? "bar sorted"
          : activeSet.has(index)
            ? "bar active"
            : "bar";

        return (
          <div className="bar-track" key={index}>
            <div className={className} style={{ height: `${value}px` }}>
              <span className="bar-value">{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bars;
