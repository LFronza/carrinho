class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        if (this.produtos.length >= 10) {
            alert("O carrinho já tem 10 produtos.");
            return;
        }

        if (!Number.isInteger(produto.valor)) {
            alert("O valor do produto deve ser um número inteiro.");
            return;
        }

        const produtoExistente = this.produtos.find(p => p.nome === produto.nome);
        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            produto.quantidade = 1;
            this.produtos.push(produto);
        }

        this.atualizarCarrinho();
    }

    calcularTotal() {
        return this.produtos.reduce((soma, produto) => soma + produto.valor * produto.quantidade, 0);
    }

    exibirProdutos() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        this.produtos.forEach((produto, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${produto.nome}: ${produto.valor} ${produto.valor > 1 ? 'reais' : 'real'} 
                <div class="quantity-controls">
                    <button class="decrement-quantity" data-index="${index}">-</button>
                    <span class="product-quantity">${produto.quantidade}</span>
                    <button class="increment-quantity" data-index="${index}">+</button>
                </div>
            `;
            cartItems.appendChild(li);
        });

        document.querySelectorAll('.increment-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                this.incrementarQuantidade(index);
            });
        });

        document.querySelectorAll('.decrement-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                this.decrementarQuantidade(index);
            });
        });
    }

    incrementarQuantidade(index) {
        this.produtos[index].quantidade++;
        this.atualizarCarrinho();
    }

    decrementarQuantidade(index) {
        if (this.produtos[index].quantidade > 1) {
            this.produtos[index].quantidade--;
        } else {
            this.produtos.splice(index, 1);
        }
        this.atualizarCarrinho();
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

    atualizarCarrinho() {
        this.exibirProdutos();

        const cartContainer = document.getElementById('cart-container');
        const total = this.calcularTotal();
        const productsSummary = document.getElementById('products-summary');
        const totalValue = document.getElementById('total-value');
        const notesSummary = document.getElementById('notes-summary');
        
        if (this.produtos.length > 0) {
            cartContainer.style.display = 'block';
            productsSummary.innerHTML = '';
            this.produtos.forEach(produto => {
                productsSummary.innerHTML += `- ${produto.nome}: ${produto.valor * produto.quantidade} ${produto.valor * produto.quantidade > 1 ? 'reais' : 'real'} (${produto.quantidade} ${produto.quantidade > 1 ? 'unidades' : 'unidade'})<br>`;
            });
            totalValue.innerHTML = `<h3>Valor total: ${total} ${total > 1 ? 'reais' : 'real'}</h3>`;
            notesSummary.innerHTML = `<h4>Deve ser no mínimo em:</h4>${this.calcularNotas(total)}`;
            document.getElementById('checkout-summary').style.display = 'block';
        } else {
            cartContainer.style.display = 'none';
            document.getElementById('checkout-summary').style.display = 'none';
        }
    }
}
