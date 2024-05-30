import { Produto } from './Produto.js';

export class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        if (this.produtos.length < 10) {
            this.produtos.push(produto);
        } else {
            console.log("O carrinho já tem 10 produtos.");
        }
    }

    finalizarCarrinho() {
        let total = this.calcularTotal();
        this.exibirProdutos();
        console.log(`Valor total: ${total} reais`);
        this.calcularNotas(total);
    }

    calcularTotal() {
        return this.produtos.reduce((soma, produto) => soma + produto.valor, 0);
    }

    exibirProdutos() {
        console.log("Produtos do carrinho:");
        this.produtos.forEach(produto => console.log(`- ${produto.nome}: ${produto.valor} reais`));
    }

    calcularNotas(valor) {
        const notas = [100, 50, 20, 10, 5, 2, 1];
        let restante = valor;
        console.log("Deve ser no mínimo em:");
        notas.forEach(nota => {
            let quantidade = Math.floor(restante / nota);
            if (quantidade > 0) {
                console.log(`${quantidade} nota(s) de ${nota} reais`);
                restante %= nota;
            }
        });
    }
}
