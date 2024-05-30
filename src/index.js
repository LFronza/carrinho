import { Produto } from './classes/Produto.js';
import { Carrinho } from './classes/Carrinho.js';
import prompt from './utils/prompt-sync.js';

const carrinho = new Carrinho();

while (true) {
    let nome = prompt("Nome do produto: ");
    let valor = parseFloat(prompt("Valor: "));
    let produto = new Produto(nome, valor);
    carrinho.adicionarProduto(produto);

    let opcao = prompt("Comprar mais produtos? 1- Sim | 2- Finalizar Compra ");
    if (opcao === '2') {
        carrinho.finalizarCarrinho();
        break;
    }
}
