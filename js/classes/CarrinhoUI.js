export default class CarrinhoUI {
    constructor(carrinho, calculadoraTotal, calculadoraNotas) {
        this.carrinho = carrinho;
        this.calculadoraTotal = calculadoraTotal;
        this.calculadoraNotas = calculadoraNotas;
    }

    exibirProdutos() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        this.carrinho.produtos.forEach((produto, index) => {
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
                this.carrinho.incrementarQuantidade(index);
                this.atualizarCarrinho();
            });
        });

        document.querySelectorAll('.decrement-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                this.carrinho.decrementarQuantidade(index);
                this.atualizarCarrinho();
            });
        });
    }

    atualizarCarrinho() {
        this.exibirProdutos();

        const cartContainer = document.getElementById('cart-container');
        const total = this.calculadoraTotal.calcularTotal(this.carrinho.produtos);
        const productsSummary = document.getElementById('products-summary');
        const totalValue = document.getElementById('total-value');
        const notesSummary = document.getElementById('notes-summary');
        
        if (this.carrinho.produtos.length > 0) {
            cartContainer.style.display = 'block';
            productsSummary.innerHTML = '';
            this.carrinho.produtos.forEach(produto => {
                productsSummary.innerHTML += `- ${produto.nome}: ${produto.valor * produto.quantidade} ${produto.valor * produto.quantidade > 1 ? 'reais' : 'real'} (${produto.quantidade} ${produto.quantidade > 1 ? 'unidades' : 'unidade'})<br>`;
            });
            totalValue.innerHTML = `<h3>Valor total: ${total} ${total > 1 ? 'reais' : 'real'}</h3>`;
            notesSummary.innerHTML = `<h4>Pague com:</h4>${this.calculadoraNotas.calcularNotas(total)}`;
            document.getElementById('checkout-summary').style.display = 'block';
        } else {
            cartContainer.style.display = 'none';
            document.getElementById('checkout-summary').style.display = 'none';
        }
    }
}
