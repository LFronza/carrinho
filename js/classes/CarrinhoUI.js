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
        const totalValue = document.getElementById('total-value');
        const notesSummary = document.getElementById('notes-summary');

        if (this.carrinho.produtos.length > 0) {
            cartContainer.style.display = 'block';
            totalValue.innerHTML = `<h3>Valor total: ${total} ${total > 1 ? 'reais' : 'real'}</h3>`;
            notesSummary.innerHTML = '';
            const notas = this.calculadoraNotas.calcularNotas(total).split('<br>');
            notas.forEach(nota => {
                if (nota.trim() !== '') {
                    const li = document.createElement('li');
                    li.innerHTML = nota;
                    notesSummary.appendChild(li);
                }
            });
        } else {
            cartContainer.style.display = 'none';
            totalValue.innerHTML = '';
            notesSummary.innerHTML = '';
        }
    }
}
