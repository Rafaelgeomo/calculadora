const botaoNumeros = document.querySelectorAll(".numero");
const botoesOperacao = document.querySelectorAll(".operador");
const botaoCalcula = document.querySelector(".calc-btn");
const botaoDelete = document.querySelector(".deletar");
const botaoZerar = document.querySelector(".zerar");
const botaoLimpa = document.querySelector(".limpar");
const elementoDeTextoDoOperadorAnterior = document.querySelector(".operacao-anterior");
const elementoDeTextoDoOperadorAtual = document.querySelector(".operacao-atual");

class Calculadora {
  constructor(
    elementoDeTextoDoOperadorAnterior,
    elementoDeTextoDoOperadorAtual
  ) {
    this.elementoDeTextoDoOperadorAnterior =
      elementoDeTextoDoOperadorAnterior;
    this.elementoDeTextoDoOperadorAtual =
      elementoDeTextoDoOperadorAtual;
    this.clear();
  }

  formatarNumeroNaTela(numero) {
    const stringNumero = numero.toString();

    const digitosInteiro = parseFloat(stringNumero.split('.')[0]);
    const digitosDecimal = stringNumero.split('.')[1];

    let inteiroTela;

    if(isNaN(digitosInteiro)) {
      inteiroTela = '';
    }else {
      inteiroTela = digitosInteiro.toLocaleString("en", {
        maximumFractionDigits:0,});
    }

    if (digitosDecimal != null) {
      return `${inteiroTela}.${digitosDecimal}`
    }else {
      return inteiroTela;
    }
  }

  deletar() {
    this.operadorAtual = this.operadorAtual.toString().slice(0, -1); //deletar o ultimo caracter escrito
  }

  calcular() {
    let resultado;

    const  anterior = parseFloat(this.operadorAnterior); //o underline é apenas para diferenciar do operacaoAnterior que estamos usando
    const atual = parseFloat(this.operadorAtual);

    if (isNaN(anterior) || isNaN(atual)) return;

    switch (this.operador) {
      case "+":
        resultado = anterior + atual;
        break;
      case "-":
        resultado = anterior - atual;
        break;
      case "÷":
        resultado = anterior / atual;
        break;
      case "*":
        resultado = anterior * atual;
        break;
      default:
        return;        
    }

    this.operadorAtual = resultado;
    this.operador = undefined;
    this.operadorAnterior = "";
  }

  escolhendoOperador(operador) {

    if (this.operadorAtual === '') return;

    if (this.operadorAnterior !== "") {
      this.calcular();
    }
    this.operador = operador;

    this.operadorAnterior = this.operadorAtual;
    this.operadorAtual = "";
  }

  acrescentarNumero(numero) {
    //o parametro é o conteudo que a pessoa está digitando no caso o numero
    if (this.operadorAtual.includes(".") && numero === ".") return; // se o operadorAtual ja tiver um "." ou numero for igual a um "." returnar
    this.operadorAtual = `${this.operadorAtual}${numero.toString()}`; // Aqui está colocando apenas no operador atual e no for com o updateDisplay ele atualiza a tela com o que foi digitado
  }

  clear() {
    this.operadorAtual = "";
    this.operadorAnterior = "";
    this.operador = undefined;
  }

  //atualizar sempre o q irá aparecer na tela
  atualizarTela() {
    this.elementoDeTextoDoOperadorAnterior.innerText = `${this.formatarNumeroNaTela(this.operadorAnterior)} ${this.operador || ""}`;
    this.elementoDeTextoDoOperadorAtual.innerText = this.formatarNumeroNaTela(this.operadorAtual);
  }
}

const calculadora = new Calculadora(
  elementoDeTextoDoOperadorAnterior,
  elementoDeTextoDoOperadorAtual
);

for (const botaoNumero of botaoNumeros) {
  botaoNumero.addEventListener("click", () => {
    calculadora.acrescentarNumero(botaoNumero.innerText); //esta pegando o numero digitado atraves do innerText e levando para o acrescentarNumero
    calculadora.atualizarTela();
  });
}

for (const botaoOperacao of botoesOperacao) {
  botaoOperacao.addEventListener("click", () => {
    calculadora.escolhendoOperador(botaoOperacao.innerText); //esta pegando os operadores e mostrando na tela
    calculadora.atualizarTela();
  });
}

botaoLimpa.addEventListener("click", () => {
  calculadora.clear();
  calculadora.atualizarTela();
});

botaoZerar.addEventListener("click", () => {
  calculadora.operadorAtual = "";
  calculadora.atualizarTela();
});

botaoCalcula.addEventListener("click", ()=> {
  calculadora.calcular();
  calculadora.atualizarTela();
});

botaoDelete.addEventListener("click", () => {
  calculadora.deletar();
  calculadora.atualizarTela();
})
