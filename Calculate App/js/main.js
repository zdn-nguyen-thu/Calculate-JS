// declare variable
const numbers = document.querySelectorAll('.btn')
let result = document.querySelector('#result')
let historyID = document.querySelector('#history')

let history = []

const handleCalculate = payload => {
    if (payload.value === '.' && result.innerHTML.includes('.')) return
    // show result

    result.innerHTML += payload.value
}

// handle click event
for (let number of numbers) {
    number.addEventListener('click', () => handleCalculate(number))
}

// Total
const total = () => {
    let total = result.innerHTML

    // The eval() method has the function of calculating mathematical expressions 
    const output = eval(total) 

    // total is an input of number, output is a total
    history.push({ total, output })
    showHistory()

    result.innerHTML = output

}

const delAll = () => {
    result.innerHTML = ''
}

const delLastItem = () => {
    const str = result.innerHTML
    const itemDelete = str.substring(0, str.length - 1)
    result.innerHTML = itemDelete
}

// show History
const showHistory = () => {
    let html = ''
    for (let number in history) {
        html += history[number].total + ' = ' + history[number].output + "<br />"
    }
    historyID.innerHTML = html
}

