class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        const produtoExistente = this.produtos.find(p => p.nome === produto.nome);
        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            produto.quantidade = 1;
            this.produtos.push(produto);
        }
    }

    calcularTotal() {
        return this.produtos.reduce((soma, produto) => soma + produto.valor * produto.quantidade, 0);
    }

    calcularNotas(valor) {
        const notas = [100, 50, 20, 10, 5, 2, 1];
        let restante = valor;
        let notasResumo = '';
        notas.forEach(nota => {
            let quantidade = Math.floor(restante / nota);
            if (quantidade > 0) {
                notasResumo += `${quantidade} ${quantidade > 1 ? 'notas' : 'nota'} de ${nota} ${nota > 1 ? 'reais' : 'real'}<br>`;
                restante %= nota;
            }
        });
        return notasResumo;
    }

    incrementarQuantidade(index) {
        this.produtos[index].quantidade++;
    }

    decrementarQuantidade(index) {
        if (this.produtos[index].quantidade > 1) {
            this.produtos[index].quantidade--;
        } else {
            this.produtos.splice(index, 1);
        }
    }
}
