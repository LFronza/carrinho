import { CalculadoraTotal } from './classes/CalculadoraTotal.js';
import CalculadoraNotas from './classes/CalculadoraNotas.js';
import Carrinho from './classes/Carrinho.js';
import CarrinhoUI from './classes/CarrinhoUI.js';
import Produto from './classes/Produto.js';


document.addEventListener('DOMContentLoaded', () => {
    const carrinho = new Carrinho();
    const calculadoraTotal = new CalculadoraTotal();
    const calculadoraNotas = new CalculadoraNotas();
    const carrinhoUI = new CarrinhoUI(carrinho, calculadoraTotal, calculadoraNotas);

    document.getElementById('add-product').addEventListener('click', () => {
        const nome = document.getElementById('product-name').value;
        const valor = parseFloat(document.getElementById('product-value').value);

        if (!nome || isNaN(valor) || valor <= 0) {
            alert('Por favor, insira um nome válido e um valor positivo.');
            return;
        }

        const produto = new Produto(nome, valor);
        carrinho.adicionarProduto(produto);
        carrinhoUI.atualizarCarrinho();

        // Limpar os inputs
        document.getElementById('product-name').value = '';
        document.getElementById('product-value').value = '';
    });
});
