import './App.scss';
import React, { useState } from 'react';

function App() {

  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");

  const trimmedExpression = expression.trim();

  const isOperator = (symbol) => {
    return symbol === "/" || symbol === "*" || symbol === "+" || symbol === "-";
  }

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (isOperator(symbol)) {
      setExpression(trimmedExpression + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  }

  const calculate = () => {
    if (isOperator(trimmedExpression.charAt(trimmedExpression.length - 1))) return;

    const parts = trimmedExpression.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+",].includes(parts[i].charAt(0)) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);

        let j = 0;
        let k = i - 1;

        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if(isOperator(newExpression.charAt(0))){
      setAnswer(eval(answer + newExpression));
    } else{
      setAnswer(eval(newExpression));
    }
    setExpression("");
  }




  return (
    <div className="App">
      <div className="calculator" id="calculator">
        <div className="display" id="display">
          <div className="answer" id="answer">{answer}</div>
          <div className="expression" id="expression">{expression}</div>
        </div>
        <div className="pad clear" id="clear" onClick={() => buttonPress("clear")}>AC</div>
        <div className="pad operators divide" id="divide" onClick={() => buttonPress("/")}>/</div>
        <div className="pad operators multiply" id="multiply" onClick={() => buttonPress("*")}>*</div>
        <div className="pad number seven" id="seven" onClick={() => buttonPress("7")}>7</div>
        <div className="pad number eight" id="eight" onClick={() => buttonPress("8")}>8</div>
        <div className="pad number nine" id="nine" onClick={() => buttonPress("9")}>9</div>
        <div className="pad operators subtract" id="subtract" onClick={() => buttonPress("-")}>-</div>
        <div className="pad number four" id="four" onClick={() => buttonPress("4")}>4</div>
        <div className="pad number five" id="five" onClick={() => buttonPress("5")}>5</div>
        <div className="pad number six" id="six" onClick={() => buttonPress("6")}>6</div>
        <div className="pad operators add" id="add" onClick={() => buttonPress("+")}>+</div>
        <div className="pad number one" id="one" onClick={() => buttonPress("1")}>1</div>
        <div className="pad number two" id="two" onClick={() => buttonPress("2")}>2</div>
        <div className="pad number three" id="three" onClick={() => buttonPress("3")}>3</div>
        <div className="pad equals" id="equals" onClick={() => buttonPress("=")}>=</div>
        <div className="pad number zero" id="zero" onClick={() => buttonPress("0")}>0</div>
        <div className="pad decimal" id="decimal" onClick={() => buttonPress(".")}>.</div>
      </div>
    </div>
  );
}

export default App;
