import React from 'react';

function Dimensions({ onDimNumChange }) {
  const setDimensions = (e) => {
    onDimNumChange(Number(e.target.value));
  };

  return (
    <div className="dimensions-div">
      <label>
        Number of rows/columns:
        <input type="number" onChange={setDimensions} />
      </label>
    </div>
  );
}

export default Dimensions;
