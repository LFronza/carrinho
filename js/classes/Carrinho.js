class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        if (this.produtos.length >= 10) {
            alert("O carrinho já tem 10 produtos.");
            return;
        }

        // Verifica se o valor do produto é um número inteiro
        if (!Number.isInteger(produto.valor)) {
            alert("O valor do produto deve ser um número inteiro.");
            return;
        }

        // Adiciona o produto ao carrinho
        this.produtos.push(produto);
    }

    calcularTotal() {
        return this.produtos.reduce((soma, produto) => soma + produto.valor, 0);
    }

    exibirProdutos() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        this.produtos.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome}: ${produto.valor} reais`;
            cartItems.appendChild(li);
        });
    }

    calcularNotas(valor) {
        const notas = [100, 50, 20, 10, 5, 2, 1];
        let restante = valor;
        let notasResumo = '';
        notas.forEach(nota => {
            let quantidade = Math.floor(restante / nota);
            if (quantidade > 0) {
                notasResumo += `${quantidade} nota(s) de ${nota} reais<br>`;
                restante %= nota;
            }
        });
        return notasResumo;
    }

    finalizarCarrinho() {
        let total = this.calcularTotal();
        this.exibirProdutos();
        const productsSummary = document.getElementById('products-summary');
        const totalValue = document.getElementById('total-value');
        const notesSummary = document.getElementById('notes-summary');
        productsSummary.innerHTML = '';
        this.produtos.forEach(produto => {
            productsSummary.innerHTML += `- ${produto.nome}: ${produto.valor} reais<br>`;
        });
        totalValue.innerHTML = `<h3>Valor total: ${total} reais`;
        notesSummary.innerHTML = `<h4>Deve ser no mínimo em:</h4>${this.calcularNotas(total)}`;
        document.getElementById('checkout-summary').style.display = 'block';
    }
}
