import { useState } from 'react';
import './matrixfield.css';

export default function MatrixField(){
  const [ matrixSize, setMatrixSize ] = useState(2);
  console.log(matrixSize);

  return(
    <div>
    <button type="button" onClick={() => setMatrixSize(2)}>2x2</button>
    <button type="button" onClick={() => setMatrixSize(3)}>3x3</button>
    <button type="button" onClick={() => setMatrixSize(4)}>4x4</button>
    <button type="button" onClick={() => setMatrixSize(5)}>5x5</button>
    <button type="button" onClick={() => setMatrixSize(6)}>6x6</button>
    {matrixSize}
    </div>
  );
}