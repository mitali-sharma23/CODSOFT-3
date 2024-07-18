//select display element
const display = document.getElementById('display');
//intializ value and operator
let firstvalue = null;
let secondvalue = null;
let operator = null;
let displayvalue = '';
//handle clear button
const cleardisplay = () => {
    displayvalue = '';
    firstvalue = null;
    secondvalue = null;
    operator = null;
    updatedisplay(displayvalue);
}
document.getElementById('clear').addEventListener('click',cleardisplay);
//handle numbers
const updatedisplay = (value) => {
    display.innerText = value;
}
document.querySelectorAll('.number').forEach(button=>{
    button.addEventListener('click',()=>{
        displayvalue += button.innerText;
        updatedisplay(displayvalue);
});
});
//hamdle decimal button
document.getElementById('decimal').addEventListener('click',()=>{
    if(!displayvalue.includes('.')){
        displayvalue += '.';
        updatedisplay(displayvalue)
    }
});
/*This function ensures that the calculator can handle sequential operations,
 updating the first operand with the result of the previous operation and setting up for the next operation.*/
const handleoperator =(op)=>{
    // Check if firstValue is null (indicating that no first value has been set yet)
    if(firstvalue === null){
        firstvalue = parseFloat(displayvalue);
    }
    else{
        // If firstValue is already set, assign the current display value to secondValue
        secondvalue = parseFloat(displayvalue);
         // If an operator has already been set, perform the calculation with firstValue, secondValue, and the existing operator
        if(operator){
             // Call the calculate function to perform the operation and update firstValue with the result
            firstvalue = calculate(firstvalue,secondvalue,operator);
        }
    }
     // Update the operator to the new operator passed to this function
    operator = op;
    displayvalue = firstvalue + '' +operator + '';
    updatedisplay(displayvalue);
     // Clear the display value in preparation for the next input
     displayvalue = '';
}
const calculate = (first,second,op)=>{        //function to perform operation
    switch(op){
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}
//handle operators
document.getElementById('add').addEventListener('click', ()=>handleoperator('+'));
document.getElementById('subtract').addEventListener('click', ()=>handleoperator('-'));
document.getElementById('multiply').addEventListener('click', ()=>handleoperator('*'));
document.getElementById('divide').addEventListener('click', ()=>handleoperator('/'));
//handle equals to 
document.getElementById('equals').addEventListener('click',()=>{
    if(operator !== null){
        secondvalue = parseFloat(displayvalue);
        displayvalue = calculate(firstvalue,secondvalue,operator).toString();
        updatedisplay(displayvalue);
        firstvalue = null;
        secondvalue = null;
        operator = null;
    }
});