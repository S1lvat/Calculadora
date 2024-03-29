var btns = document.querySelectorAll("[id*=btn]")
var operadores = document.querySelectorAll("[id*=op]")
var display = document.querySelector("#display")

let inicial = true;
let novoNumero = false;
let novoCalculo = false;
let afterCalc = false
let percentActive = false
let op;
let num1 = [];
let num2 = [];

function calcular() {
    if (op != undefined && num2.length !== 0) {
        let numero1 = num1.join('')
        let numero2 = num2.join('')
        const resultado =
            eval(`${parseFloat(numero1)}${op}${parseFloat(numero2)}`)
        novoCalculo = true
        num1 = new Array()
        num1.push(resultado)
        num2 = []
        afterCalc = true
        percentActive = false
        atualizarTela(resultado === NaN ? 0 : resultado)
    }
}
function atualizarTela(e) {
    if (novoCalculo || inicial) {
        display.textContent = e
        novoCalculo = false
        inicial = false
    } else if (percentActive ) {
        display.textContent = e
    } else {
        display.textContent += e
    }

    if (display.textContent == 0) {
        display.textContent = 'Nada para ver aqui...'
        novoNumero = false
        num1 = [], num2 = []
        novoCalculo = true
    }
}

function inserirNum(e) {

    if (!novoNumero || afterCalc) {
        num1.push(e.target.textContent)
    } else {
        num2.push(e.target.textContent)
    }

    atualizarTela(e.target.textContent)
}

function retirarNum() {

    if (!novoNumero || afterCalc) {
        num1 = num1.join('')
        num1 = num1.split('')
        num1.pop()
        novoCalculo = true
        atualizarTela(num1.join(''))
    } else {
        num2.pop()
        novoCalculo = true
        atualizarTela(`${num1.join('')} ${op} ${num2.join('')}`)
    }

}

function selecionarOp(e) {
    if(e.target.textContent === '%' && num2.length != 0) {
        num2 = num2.join('')
        let percentResult = Number(num2) / 100
        num2 = new Array()
        num2.push(percentResult)
        percentActive = true
        atualizarTela(`${num1.join('')} ${op} ${num2.join('')}`)
    } else if (e.target.textContent === '%' && num2.length == 0){
        percentActive = true
        num1 = []
        op = undefined
        atualizarTela('Operação não permitida!')
    }

    if (num1.length !== 0 && !percentActive) {
        if (!novoNumero) {
            op = e.target.textContent
            atualizarTela(` ${op} `)
            novoNumero = true
        } else {
            op = e.target.textContent
            novoCalculo = true
            atualizarTela(`${num1.join('')} ${op} `)
        }
    }
    if (!percentActive && num1.length !== 0 && num2.length !== 0) {
        calcular()
        atualizarTela(` ${op} `)
    }
    afterCalc = false
}

function clean() {
    num1 = []
    num2 = []
    op = undefined
    novoCalculo = false
    novoNumero = false
    inicial = true
    percentActive = false
    atualizarTela('')
}

btns.forEach(num => num.addEventListener('click', inserirNum))

operadores.forEach(operador => operador.addEventListener('click', selecionarOp))

document.getElementById('eraser').addEventListener('click', retirarNum)
document.getElementById('res').addEventListener('click', calcular)
document.getElementById('clean').addEventListener('click', clean)