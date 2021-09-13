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
    for (let i = 0; i < matrix[line].length; i++) {
      matrix[line][i] = matrix[line][i]*scalar
    }
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return e})}));
    console.log(matrix)
  }

  function changeLines(line1, line2){
    let tempArray = matrix[line1];
    matrix[line1] = matrix[line2];
    matrix[line2] = tempArray;
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return e})}));
    console.log(matrix)
  }

  function multiplyAndSumLines(scalar, line1, line2){
    for (let i = 0; i < matrix[line1].length; i++) {
      matrix[line2][i] = matrix[line2][i] + (matrix[line1][i]*scalar);
    }
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return e})}));
    console.log(matrix)
  }

  function matrixDisplay(){
    return(
      <div>
        {matrix.map((e) => {return(e.map((e)=> {return(<div>{e}</div>)}))})}
        <p>Operações:</p>
        <div>
          <button type="button" onClick={()=>{
            mutiplyByScalar(Number(document.getElementById("scalarMultiplyByScalar").value), 
                            Number(document.getElementById("lineMultiplyByScalar").value) - 1)
                            }}>Multiplicar linha por escalar</button>
          <input placeholder= "Escalar" id ="scalarMultiplyByScalar"/>
          <input placeholder= "Linha" id = "lineMultiplyByScalar"/>
        </div>
        <div>
          <button type="button" onClick={()=>{
            changeLines(Number(document.getElementById("line1ChangeLines").value) - 1, 
                        Number(document.getElementById("line2ChangeLines").value) - 1)
                        }}>Trocar linhas</button>
          <input placeholder= "Linha" id ="line1ChangeLines"/>
          <input placeholder= "Linha" id = "line2ChangeLines"/>
        </div>
        <div>
          <button type="button" onClick={()=>{
            multiplyAndSumLines(Number(document.getElementById("scalar_multiplyAndSumLines").value),
                                Number(document.getElementById("line1_multiplyAndSumLines").value) - 1,
                                Number(document.getElementById("line2_multiplyAndSumLines").value) - 1)
                                }}>Multiplicar linha e somar a outra</button>
          <input placeholder= "Escalar" id ="scalar_multiplyAndSumLines"/>
          <input placeholder= "Linha multiplicada pelo escalar" id = "line1_multiplyAndSumLines"/>
          <input placeholder= "Linha da troca" id ="line2_multiplyAndSumLines"/>
        </div>
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