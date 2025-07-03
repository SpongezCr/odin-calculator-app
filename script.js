'use strict';

const OPERATORS = "+-*/";
const NUMBERS = "0123456789."

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}

function formatNumber(a) {
    a = a.toString();
    if (a.includes(".")) {
        let index = a.indexOf(".");
        if (index < a.length - 4) {
            a = Number(a).toFixed(3);
        }
    }
    return a;
}

function resetBooleanValues() {
    waitingForNumber = true;
    leadingZero = false;
    hasDecimal = false;
}

function onButtonClick(char) {

    if (char === "c" || char === "Enter"){
        firstNumber = null;
        displayString = "";
        curOperator = null;
        resetBooleanValues();
    }

    else if (char === "=") {

        if (displayString[displayString.length - 1] === ".") return;
        if (waitingForNumber) return;

        firstNumber = operate(firstNumber, curOperator, Number(displayString));
        displayString = formatNumber(firstNumber);
        curOperator = null;
        leadingZero = false;
        hasDecimal = false;
        waitingForNumber = true;
    }

    else if (OPERATORS.includes(char)) {

        if (displayString[displayString.length - 1] === ".") return;

        if (waitingForNumber && firstNumber === null) 
            return;

        if (!waitingForNumber && firstNumber === null) {
            firstNumber = Number(displayString);
            displayString = "";
            curOperator = char;
            resetBooleanValues();
        }

        if (waitingForNumber && firstNumber !== null) {
            curOperator = char;
        }

        if (!waitingForNumber && firstNumber !== null) {
            firstNumber = operate(firstNumber, curOperator, Number(displayString));
            displayString = formatNumber(firstNumber);
            curOperator = char;
            resetBooleanValues();
        }

    }

    else if (char === "Backspace") {
        let char = displayString[displayString.length - 1];
        if (char === ".") {
            hasDecimal = 0;
            if (displayString.length === 2 && displayString[0] === "0") {
                leadingZero = true;
            }
        }
        if (char === "0" && leadingZero) {
            leadingZero = false;
        }
        displayString = displayString.slice(0,-1);
        if (displayString.length === 0) {
            waitingForNumber = true;
        }
    }

    else if (NUMBERS.includes(char)){

        if (char === "0" && leadingZero) return;
        if (char === "." && hasDecimal) return;

        if (waitingForNumber) {
            displayString = "";
            if (char === "0") {
                leadingZero = true;
            }
            if (char === "."){
                displayString += "0";
                hasDecimal = true;
            }
        }

        if (leadingZero && char !== ".") {
            displayString = "";
        }

        displayString += char;
        waitingForNumber = false;

        if (char !== "0") {
            leadingZero = false;
        }
    }

    display.textContent = displayString;
}

let displayString = "";
let curOperator = null;
let firstNumber = null;
let waitingForNumber = true;
let leadingZero = false;
let hasDecimal = false;

const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

buttons.addEventListener('click', e => onButtonClick(e.target.id));

document.addEventListener('keyup', e => onButtonClick(e.key));