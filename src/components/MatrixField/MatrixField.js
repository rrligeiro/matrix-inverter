import { useState } from 'react';
import './matrixfield.css';
import * as Fraction from "fraction.js"

export default function MatrixField(){
  const [ matrixSize, setMatrixSize ] = useState(2);
  const [ entryMatrix, setEntryMatrix ] = useState(true);
  const [ matrix, setMatrix ] = useState([]);

  function matrixGenerator(matrixSize) {
    return(
      <div>
        <div className="matrix-input-field">
          {[...Array(matrixSize)].map(() => {
            return(
              <div>
                {[...Array(matrixSize)].map(() => {
                  return(
                    <input className="matrix-input"/>
                  )})}
              </div>
            )})}
        </div>
        <div className="operation-selectors">
          <button type="button" onClick={()=>{ saveMatrix(); setEntryMatrix(false) }}>Escalonamento</button>
          <button type="button" onClick={()=>{ saveMatrix(); addIndentityMatrix(); setEntryMatrix(false) }}>Inversão de matriz</button>
        </div>
      </div>
    )
  }

  function saveMatrix(){
    let k = 0;
    for (let i = 0; i < matrixSize; i++) {
      let tempArray = [];
      for (let j = 0; j < matrixSize; j++) {
        tempArray.push(document.querySelectorAll('input')[k].value);
        k++;
      }
      matrix.push(tempArray);
      console.log(matrix);
      console.log(typeof(Fraction(1/3).toString()))
      console.log(Fraction(1/3).valueOf())
    }
  }

  function addIndentityMatrix(){
    for (let i = 0; i < matrixSize; i++) {
      for (let j = matrixSize; j < matrixSize*2; j++) {
        matrix[i][j] = 0;
        if ( i === j - matrixSize) {
          matrix[i][j] = 1;
        }
      }
    }
  }
  
  function mutiplyByScalar(scalar, line){
    for (let i = 0; i < matrix[line].length; i++) {
      matrix[line][i] = Fraction(matrix[line][i]).valueOf() * Fraction(scalar).valueOf();
    }
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return Fraction(e).toFraction()})}));
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
      matrix[line2][i] = Fraction(matrix[line2][i]).valueOf() + (Fraction(matrix[line1][i]).valueOf() * Fraction(scalar).valueOf());
    }
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return Fraction(e).toFraction()})}));
    console.log(matrix)
  }

  function matrixDisplay(){
    return(
      <div>
        <div className="matrix-display">
          {matrix.map((e) => {
            return(
            <div className="matrix-line">
              {e.map((e)=> {return(
              <div className="matrix-itens" >{e}</div>
              )})}
            </div>
            )})}
        </div>
        <div className="operation-field">
          <div className="multiplyByScalar">
            <button type="button" onClick={()=>{
              mutiplyByScalar(document.getElementById("scalar_multiplyByScalar").value, 
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
      </div>
    )
  }

  return(
    <div className="body">
      <div className="matrix-generator-field">
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(2); setEntryMatrix(true)}}>2 x 2</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(3); setEntryMatrix(true)}}>3 x 3</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(4); setEntryMatrix(true)}}>4 x 4</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(5); setEntryMatrix(true)}}>5 x 5</button>
        <button type="button" onClick={() => {setMatrix([]); setMatrixSize(6); setEntryMatrix(true)}}>6 x 6</button>
      </div>
      <div>
        {entryMatrix ? matrixGenerator(matrixSize) : matrixDisplay()}
      </div>
    </div>
  );
}