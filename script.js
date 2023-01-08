const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    if (b === 0) {
        return "ERROR";
    } else {
        return a / b;
    }
}

const operate = function (operator, a, b) {
    switch (operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
    }
}

let currentDisplayArray = [];
let previousResult = 0;
const listOfOperators = ["add", "subtract", "multiply", "divide"];

const numberButtons = document.querySelectorAll("[data-type='number']");
const operatorButtons = document.querySelectorAll("[data-type='operator']");
const equalsButton = document.querySelector("[data-type='equals']");
const allClearButton = document.querySelector("[data-type='all-clear']");
const deleteButton = document.querySelector("[data-type='delete']");
const dotButton = document.querySelector("[data-type='dot']");

numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", (e) => {
        let numberId = e.target.id;
        currentDisplayArray.push(numberId);
        console.log(currentDisplayArray);
        if (findOperatorIndex(currentDisplayArray) === 0) {
            console.log("evaluating after pressing number");
            evaluate(currentDisplayArray);
        }
    })
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", (e) => {
        let operatorId = e.target.id;
        //check whether the current operator is already pressed
        if (currentDisplayArray[currentDisplayArray.length - 1] === operatorId) return;
        //check whether any of the other operators is selected
        if (findOperatorIndex(currentDisplayArray) === (currentDisplayArray.length - 1)) {
            
        }
        if (listOfOperators.some(r => currentDisplayArray.includes(r))) {
            //evaluate first, add operator after previous result
            console.log("operator id already added, evaluating");
            evaluate(currentDisplayArray);
            currentDisplayArray.push(operatorId);
            console.log("added operator id");
        } else {
            currentDisplayArray.push(operatorId);
            console.log("added operator id");
        }
    })
})

const evaluate = function (array) {
    //find index of operator
    //split array to two parts, before and after the operator
    //turn array to number
    //calculate result
    let operatorIndex = findOperatorIndex(currentDisplayArray);
    console.log("operator index: " + operatorIndex)

    let a = arrayToNumber(currentDisplayArray.slice(0, operatorIndex));
    let b = arrayToNumber(currentDisplayArray.slice(operatorIndex + 1));
    console.log(a);
    console.log(b);
    let result = previousResult + operate(currentDisplayArray[operatorIndex], a, b);
    console.log(result);
    clear();
}

const findOperatorIndex = function (array) {
    for (currentOperator of listOfOperators) {
        if (array.indexOf(currentOperator) > -1) {
            return array.indexOf(currentOperator);
        }
    }
}

const clear = function () {
    currentDisplayArray = [];
}

const arrayToNumber = function (array) {
    return array.map(Number).reduce((accum, digit) => (accum * 10) + digit, 0);
}