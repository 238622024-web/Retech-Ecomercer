// contador-carrinho.js
// Atualiza o badge do carrinho em todas as páginas
function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
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
document.addEventListener('DOMContentLoaded', atualizarContadorCarrinho);
window.addEventListener('storage', atualizarContadorCarrinho); // Sincroniza entre abas
