
// requirement 1
const number = document.querySelector("#number-input")
const output = document.querySelector("#number-output")
const btn = document.querySelector("#calculate-btn")

function calculate(num){
  total = 0;
  for(i=1; i<=num; i++){
    total += i;
  }
  return total;
}

function button_click(){
  // get number from input element
  num = number.value;
  // calculate using function
  result = calculate(num)
  // output to diplay element
  output.innerHTML = result
}

// requirement 2
const number2 = document.querySelector("#number2-input")
const output2 = document.querySelector("#number2-output")
const btn2 = document.querySelector("#calculate-btn2")

function sum(a, b){
  return a + b
}

const arrowsum = (a,b) => a+b
const div = function(a,b)
  { 
    return a/b ? b != 0 : null
  }

btn2.addEventListener("click", () => {
   // get numbers from input elements
   a = parseInt(number.value);
   b = parseInt(number2.value);
   //result = (a,b) => a + b
   result = sum(a,b)
   // output to diplay element
   output2.innerHTML = result
})


