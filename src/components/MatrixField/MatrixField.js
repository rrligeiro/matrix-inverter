import { useState } from 'react';
import './matrixfield.css';
import * as Fraction from "fraction.js"

export default function MatrixField(){
  const [ matrixLine, setMatrixLine ] = useState(2);
  const [ matrixColunm, setMatrixColunm ] = useState(2);
  const [ entryMatrix, setEntryMatrix ] = useState(true);
  const [ matrix, setMatrix ] = useState([]);

  function matrixGenerator(matrixLine, matrixColunm) {
    console.log(matrixLine)
    console.log(matrixColunm)
    return(
      <div>
        <div className="matrix-input-field">
          {[...Array(matrixLine)].map(() => {
            return(
              <div>
                {[...Array(matrixColunm)].map(() => {
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
    let k = 2;
    for (let i = 0; i < matrixLine; i++) {
      let tempArray = [];
      for (let j = 0; j < matrixColunm; j++) {
        tempArray.push(document.querySelectorAll('input')[k].value);
        k++;
      }
      matrix.push(tempArray);
    }
  }

  function addIndentityMatrix(){
    for (let i = 0; i < matrixLine; i++) {
      for (let j = matrixLine; j < matrixLine*2; j++) {
        matrix[i][j] = 0;
        if ( i === j - matrixLine) {
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
  }

  function changeLines(line1, line2){
    let tempArray = matrix[line1];
    matrix[line1] = matrix[line2];
    matrix[line2] = tempArray;
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return e})}));
  }

  function multiplyAndSumLines(scalar, line1, line2){
    for (let i = 0; i < matrix[line1].length; i++) {
      matrix[line2][i] = Fraction(matrix[line2][i]).valueOf() + (Fraction(matrix[line1][i]).valueOf() * Fraction(scalar).valueOf());
    }
    setMatrix(matrix.map((e)=>{return e.map((e)=>{return Fraction(e).toFraction()})}));
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
        <div className="matrix-text">Selecione o tamanho da matriz</div>
        <div>
          <button type="button" onClick={() => {setMatrix([]); setMatrixLine(Number(document.getElementById("line").value)); setMatrixColunm(Number(document.getElementById("colunm").value)); setEntryMatrix(true)}}>m x n</button>
          <input placeholder= "m" id = "line"/>
          <input placeholder= "n" id ="colunm"/>
        </div>
      </div>
      <div>
        {entryMatrix ? matrixGenerator(matrixLine, matrixColunm) : matrixDisplay()}
      </div>
    </div>
  );
}