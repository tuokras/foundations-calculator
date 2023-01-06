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

let display = "";
let a = 0;
let b = 0;
let operator;

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const buttonType = event.target.dataset.type;
        console.log(buttonType);

        let operation = false;

        //button type
        switch (buttonType) {
            case "number":
                if (event.target.id === "0") {
                    display = event.target.id;
                } else {
                    display += event.target.id;
                }
                break;
            case "operator":
                a = Number(display);
                console.log("a: " + a);
                operation = true;
                operator = event.target.id;
                console.log(operator);
                break;
            case "equals":
                b = Number(display);
                console.log("b: " + b);
                display = operate(operator, a, b);
                console.log(display);
                break;
            case "all-clear":
                display = "";
                a = 0;
                b = 0;
                break;
            default:
                console.log("ERROR IN BUTTON TYPE EVALUATOR")
                break;
        }

        //display handling
        switch (operation) {
            case false:
                document.querySelector(".display").textContent = display;
                break;
            case true:
                document.querySelector(".display").textContent = a;
                display = "";
                break;
        }

        if (display === "" && operation === false) {
            document.querySelector(".display").textContent = "0";
        }
    })
})