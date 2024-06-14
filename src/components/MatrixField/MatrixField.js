import { useState } from 'react';
import './matrixfield.css';
import * as Fraction from "fraction.js";

export default function MatrixField(){
  const [matrixSize, setMatrixSize] = useState(2);
  const [entryMatrix, setEntryMatrix] = useState(true);
  const [matrix, setMatrix] = useState([]);
  const [history, setHistory] = useState([]);

  function matrixGenerator(matrixSize) {
    return(
      <div>
        <div className="matrix-input-field">
          {[...Array(matrixSize)].map((_, i) => {
            return(
              <div key={i}>
                {[...Array(matrixSize)].map((_, j) => {
                  return(
                    <input key={j} className="matrix-input"/>
                  )})}
              </div>
            )})}
        </div>
        <div className="operation-selectors">
          <button type="button" onClick={() => { saveMatrix(); setEntryMatrix(false) }}>Escalonamento</button>
          <button type="button" onClick={() => { saveMatrix(); addIdentityMatrix(); setEntryMatrix(false) }}>Inversão de matriz</button>
        </div>
      </div>
    )
  }

  function saveMatrix(){
    let tempMatrix = [];
    let k = 0;
    for (let i = 0; i < matrixSize; i++) {
      let tempArray = [];
      for (let j = 0; j < matrixSize; j++) {
        tempArray.push(document.querySelectorAll('input')[k].value);
        k++;
      }
      tempMatrix.push(tempArray);
    }
    setMatrix(tempMatrix);
    setHistory([...history, `Matrix of size ${matrixSize}x${matrixSize} created`]);
  }

  function addIdentityMatrix(){
    let newMatrix = [...matrix];
    for (let i = 0; i < matrixSize; i++) {
      for (let j = matrixSize; j < matrixSize * 2; j++) {
        newMatrix[i][j] = 0;
        if (i === j - matrixSize) {
          newMatrix[i][j] = 1;
        }
      }
    }
    setMatrix(newMatrix);
    setHistory([...history, `Identity matrix added to the right side`]);
  }

  function multiplyByScalar(scalar, line){
    let newMatrix = [...matrix];
    for (let i = 0; i < newMatrix[line].length; i++) {
      newMatrix[line][i] = Fraction(newMatrix[line][i]).valueOf() * Fraction(scalar).valueOf();
    }
    setMatrix(newMatrix.map(e => e.map(e => Fraction(e).toFraction())));
    setHistory([...history, `Line ${line + 1} multiplied by ${scalar}`]);
  }

  function changeLines(line1, line2){
    let newMatrix = [...matrix];
    let tempArray = newMatrix[line1];
    newMatrix[line1] = newMatrix[line2];
    newMatrix[line2] = tempArray;
    setMatrix(newMatrix.map(e => e.map(e => e)));
    setHistory([...history, `Lines ${line1 + 1} and ${line2 + 1} swapped`]);
  }

  function multiplyAndSumLines(scalar, line1, line2){
    let newMatrix = [...matrix];
    for (let i = 0; i < newMatrix[line1].length; i++) {
      newMatrix[line2][i] = Fraction(newMatrix[line2][i]).valueOf() + (Fraction(newMatrix[line1][i]).valueOf() * Fraction(scalar).valueOf());
    }
    setMatrix(newMatrix.map(e => e.map(e => Fraction(e).toFraction())));
    setHistory([...history, `Line ${line1 + 1} multiplied by ${scalar} and added to line ${line2 + 1}`]);
  }

  function matrixDisplay(){
    return(
      <div>
        <div className="matrix-display">
          {matrix.map((e, i) => {
            return(
            <div key={i} className="matrix-line">
              {e.map((e, j) => {return(
              <div key={j} className="matrix-item" >{e}</div>
              )})}
            </div>
            )})}
        </div>
        <div className="operation-field">
          <div className="multiplyByScalar">
            <button type="button" onClick={()=>{
              multiplyByScalar(document.getElementById("scalar_multiplyByScalar").value, 
                              document.getElementById("line_multiplyByScalar").value - 1)
                              }}>Multiplicar linha por escalar</button>
            <div>kL --{'>'} L</div>
            <div className = "operation-inputs">
              <input placeholder= "k" id ="scalar_multiplyByScalar"/>
              <input placeholder= "L" id = "line_multiplyByScalar"/>
            </div>
          </div>
          <div className="changeLines">
            <button type="button" onClick={()=>{
              changeLines(document.getElementById("line_1changeLines").value - 1, 
                          document.getElementById("line2_changeLines").value - 1)
                          }}>Trocar linhas</button>
            <div>L {'<'}--{'>'} L</div>
            <div className = "operation-inputs">
              <input placeholder= "L" id ="line_1changeLines"/>
              <input placeholder= "L" id = "line2_changeLines"/>
            </div>
          </div>
          <div className="multiplyAndSumLines">
            <button type="button" onClick={()=>{
              multiplyAndSumLines(document.getElementById("scalar_multiplyAndSumLines").value,
                                  document.getElementById("line1_multiplyAndSumLines").value - 1,
                                  document.getElementById("line2_multiplyAndSumLines").value - 1)
                                  }}>Multiplicar linha e somar a outra</button>
            <div>kLx + Ly   --{'>'} Ly</div>
            <div className = "operation-inputs">
              <input placeholder= "k" id ="scalar_multiplyAndSumLines"/>
              <input placeholder= "Lx" id = "line1_multiplyAndSumLines"/>
              <input placeholder= "Ly" id ="line2_multiplyAndSumLines"/>
            </div>
          </div>
        </div>
        <div className="operation-history">
          <h3>Histórico de Operações</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return(
    <div className="body">
      <div className="matrix-generator-field">
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(2); setEntryMatrix(true); setHistory([])}}>2 x 2</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(3); setEntryMatrix(true); setHistory([])}}>3 x 3</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(4); setEntryMatrix(true); setHistory([])}}>4 x 4</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(5); setEntryMatrix(true); setHistory([])}}>5 x 5</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(6); setEntryMatrix(true); setHistory([])}}>6 x 6</button>
      </div>
      <div>
        {entryMatrix ? matrixGenerator(matrixSize) : matrixDisplay()}
      </div>
    </div>
  );
}
