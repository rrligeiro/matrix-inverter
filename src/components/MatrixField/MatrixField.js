import { useState } from 'react';
import './matrixfield.css';

export default function MatrixField(){
  const [ matrixSize, setMatrixSize ] = useState(2);
  const [ entryMatrix, setEntryMatrix ] = useState(true);
  const [ matrix, setMatrix ] = useState([]);

  function matrixGenerator(matrixSize) {
    return(
      <div>
        <p>Entre com os valores da sua matriz</p>
        {[...Array(matrixSize*matrixSize)].map(() => {
          return(
            <input type='number' />
          )
        })}
        <button type="button" onClick={()=>{ saveMatrix(); setEntryMatrix(false) }}>Escalonamento</button>
        <button type="button" onClick={()=>{ saveMatrix(); addIndentityMatrix(); setEntryMatrix(false) }}>Inversão de matriz</button>
      </div>
    )
  }

  function saveMatrix(){
    let k = 0;
    for (let i = 0; i < matrixSize; i++) {
      let tempArray = [];
      for (let j = 0; j < matrixSize; j++) {
        tempArray.push(Number(document.querySelectorAll('input')[k].value));
        k++;
      }
      matrix.push(tempArray);
    }
  }

  function addIndentityMatrix(){
    for (let i = 0; i < matrixSize; i++) {
      for (let j = matrixSize; j < matrixSize*2; j++) {
        matrix[i][j] = 0;
        if ( i == j - matrixSize) {
          matrix[i][j] = 1;
        }
      }
    }
  }
  
  function mutiplyByScalar(scalar, line){
    for (let i = 0; i < matrixSize; i++) {
      matrix[line][i] = matrix[line][i]*scalar
    }
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return e})}));
    console.log(matrix);
  }

  function matrixDisplay(){
    return(
      <div>
        {matrix.map((e) => {return(e.map((e)=> {return(<div>{e}</div>)}))})}
        <p>Operações:</p>
        <button type="button" onClick={()=>{mutiplyByScalar(3, 1)}}>Multiplicar linha por escalar</button>
      </div>
    )
  }

  return(
    <div>
    <button type="button" onClick={() => {setMatrix([]); setMatrixSize(2); setEntryMatrix(true)}}>2x2</button>
    <button type="button" onClick={() => {setMatrix([]); setMatrixSize(3); setEntryMatrix(true)}}>3x3</button>
    <button type="button" onClick={() => {setMatrix([]); setMatrixSize(4); setEntryMatrix(true)}}>4x4</button>
    <button type="button" onClick={() => {setMatrix([]); setMatrixSize(5); setEntryMatrix(true)}}>5x5</button>
    <button type="button" onClick={() => {setMatrix([]); setMatrixSize(6); setEntryMatrix(true)}}>6x6</button>
    {entryMatrix ? matrixGenerator(matrixSize) : matrixDisplay()}
    </div>
  );
}