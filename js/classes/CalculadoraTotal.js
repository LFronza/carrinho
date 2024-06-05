export class CalculadoraTotal {
    calcularTotal(produtos) {
        return produtos.reduce((soma, produto) => soma + produto.valor * produto.quantidade, 0);
    }
}
