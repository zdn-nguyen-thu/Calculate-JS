class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    // As soon as create the calculator, reset the inputs
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, this.currentOperand.length -1)
  }

  // number will occur every time user clicks on a number to add 
  appendNumber(number) {
    // check if already exists . return
    // else concat string 
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  // When we choose operator, previousOperand will be become currentOperand + operation 
  // currentOperand will become empty
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    // set current = total
    // operation and previous operation becomes null
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

 // When we choose operator, previousOperand will be become currentOperand + operation 
  // currentOperand will become empty
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operator')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }
  if (event.key == 'Backspace') {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
});
