var btns = document.querySelectorAll("[id*=btn]")
var operadores = document.querySelectorAll("[id*=op]")
var display = document.querySelector("#display")

let inicial = true;
let novoNumero = false;
let novoCalculo = false;
let op;
let num1 = [];
let num2 = [];

function calcular() {
    if (op != undefined && num2.length !== 0) {
        let numero1 = num1.join('')
        let numero2 = num2.join('')
        const resultado =
            eval(`${parseInt(numero1)}${op}${parseInt(numero2)}`)
        novoCalculo = true
        num1 = new Array()
        num1.push(resultado)
        num2 = []
        atualizarTela(resultado === NaN ? 0 : resultado)
    }
}
function atualizarTela(e) {
    if (novoCalculo || inicial) {
        display.textContent = e
        novoCalculo = false
        inicial = false
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

    if (!novoNumero) {
        num1.push(e.target.textContent)
    } else {
        num2.push(e.target.textContent)
    }

    atualizarTela(e.target.textContent)
}

function retirarNum() {

    if (!novoNumero) {
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
    if (num1.length !== 0) {
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
    if (num1.length !== 0 && num2.length !== 0) {
        calcular()
        atualizarTela(` ${op} `)
    }
}

function clean() {
    num1 = []
    num2 = []
    op = undefined
    novoCalculo = false
    novoNumero = false
    inicial = true
    atualizarTela('')
}

btns.forEach(num => num.addEventListener('click', inserirNum))

operadores.forEach(operador => operador.addEventListener('click', selecionarOp))

document.getElementById('eraser').addEventListener('click', retirarNum)
document.getElementById('res').addEventListener('click', calcular)
document.getElementById('clean').addEventListener('click', clean)