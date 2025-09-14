// carrinho.js
// Lê produtos do localStorage e exibe na tabela do carrinho

document.addEventListener('DOMContentLoaded', function() {

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let descontoAplicado = parseFloat(localStorage.getItem('carrinhoDesconto')) || 0;
    let cupomUsado = localStorage.getItem('carrinhoCupom') || '';
    const cuponsValidos = {
        'RETECH10': 10,
        'FRETEGRATIS': 15.00
    };
    const tbody = document.querySelector('.cart-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let subtotal = 0;
    carrinho.forEach((item, idx) => {
        const itemSubtotal = item.preco * item.quantidade;
        subtotal += itemSubtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="cart-produto">
                <img src="${item.imagem}" alt="${item.nome}">
                <span>${item.nome}</span>
            </td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(itemSubtotal).toFixed(2)}</td>
            <td class="cart-actions"><button data-idx="${idx}" class="remover">Remover</button></td>
        `;
        tbody.appendChild(tr);
    });
    // Atualiza resumo do pedido
    const frete = 15.00;
    const subtotalEl = document.getElementById('cart-subtotal');
    const freteEl = document.getElementById('cart-frete');
    const descontoEl = document.getElementById('cart-desconto');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = 'R$ ' + subtotal.toFixed(2);
    if (freteEl) freteEl.textContent = 'R$ ' + frete.toFixed(2);
    if (descontoEl) descontoEl.textContent = descontoAplicado > 0 ? '- R$ ' + descontoAplicado.toFixed(2) : 'R$ 0,00';
    let total = subtotal + frete - descontoAplicado;
    if (totalEl) totalEl.textContent = 'R$ ' + (total > 0 ? total.toFixed(2) : '0,00');

    // Atualiza badge global do carrinho
    function atualizarContadorCarrinho() {
        let qtd = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
        localStorage.setItem('carrinhoQtd', qtd);
        document.querySelectorAll('#carrinho-contador').forEach(badge => {
            if (qtd > 0) {
                badge.textContent = qtd;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        });
    }
    atualizarContadorCarrinho();

    // Cupom de desconto
    const cupomInput = document.getElementById('cart-cupom-input');
    const aplicarCupomBtn = document.getElementById('cart-aplicar-cupom');
    const cupomFeedback = document.getElementById('cart-cupom-feedback');
    if (cupomInput && aplicarCupomBtn) {
        if (cupomUsado) cupomInput.value = cupomUsado;
        aplicarCupomBtn.addEventListener('click', function() {
            const valorCupom = cupomInput.value.trim().toUpperCase();
            if (cuponsValidos[valorCupom]) {
                descontoAplicado = cuponsValidos[valorCupom];
                cupomFeedback.textContent = 'Cupom aplicado com sucesso!';
                cupomFeedback.style.color = '#28a745';
                localStorage.setItem('carrinhoDesconto', descontoAplicado);
                localStorage.setItem('carrinhoCupom', valorCupom);
            } else {
                descontoAplicado = 0;
                cupomFeedback.textContent = 'Cupom inválido.';
                cupomFeedback.style.color = '#dc3545';
                localStorage.removeItem('carrinhoDesconto');
                localStorage.removeItem('carrinhoCupom');
            }
            // Atualiza valores
            if (descontoEl) descontoEl.textContent = descontoAplicado > 0 ? '- R$ ' + descontoAplicado.toFixed(2) : 'R$ 0,00';
            let total = subtotal + frete - descontoAplicado;
            if (totalEl) totalEl.textContent = 'R$ ' + (total > 0 ? total.toFixed(2) : '0,00');
        });
    }

    // Remover item
    tbody.addEventListener('click', function(e) {
        if (e.target.classList.contains('remover')) {
            const idx = e.target.getAttribute('data-idx');
            carrinho.splice(idx, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarContadorCarrinho();
            // Limpa desconto se carrinho ficar vazio
            if (carrinho.length === 0) {
                localStorage.removeItem('carrinhoDesconto');
                localStorage.removeItem('carrinhoCupom');
            }
            location.reload();
        }
    });

    // Limpar carrinho
    const btnLimpar = document.getElementById('cart-limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            localStorage.removeItem('carrinho');
            localStorage.setItem('carrinhoQtd', '0');
            atualizarContadorCarrinho();
            location.reload();
        });
    }
});
