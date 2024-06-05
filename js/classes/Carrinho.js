export default class Carrinho {
    constructor() {
        this.produtos = [];
        this.limiteMaximoProdutos = 10; // Definindo um limite máximo de produtos no carrinho
    }

    adicionarProduto(produto) {
        const produtoExistente = this.produtos.find(p => p.nome === produto.nome);
        if (produtoExistente) {
            if (this.calcularQuantidadeDeProdutos() < this.limiteMaximoProdutos) {
                produtoExistente.quantidade++;
            } else {
                alert("Você atingiu o limite máximo de produtos no carrinho.");
            }
        } else {
            if (this.calcularQuantidadeDeProdutos() < this.limiteMaximoProdutos) {
                produto.quantidade = 1;
                this.produtos.push(produto);
            } else {
                alert("Você atingiu o limite máximo de produtos no carrinho.");
            }
        }
    }

    calcularQuantidadeDeProdutos() {
        return this.produtos.reduce((total, produto) => total + produto.quantidade, 0);
    }

    calcularTotal() {
        return this.produtos.reduce((soma, produto) => soma + produto.valor * produto.quantidade, 0);
    }

    incrementarQuantidade(index) {
        if (this.calcularQuantidadeDeProdutos() < this.limiteMaximoProdutos) {
            this.produtos[index].quantidade++;
        } else {
            alert("Você atingiu o limite máximo de produtos no carrinho.");
        }
    }

    decrementarQuantidade(index) {
        if (this.produtos[index].quantidade > 1) {
            this.produtos[index].quantidade--;
        } else {
            this.produtos.splice(index, 1);
        }
    }
}
