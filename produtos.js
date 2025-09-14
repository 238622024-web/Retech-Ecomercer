// Filtros e ordenação para produtos Retech

document.addEventListener('DOMContentLoaded', function() {
    const inputBusca = document.getElementById('busca-produto');
    const selectCategoria = document.getElementById('filtro-categoria');
    const selectMarca = document.getElementById('filtro-marca');
    const inputPrecoMin = document.getElementById('preco-min');
    const inputPrecoMax = document.getElementById('preco-max');
    const selectOrdenar = document.getElementById('ordenar-produtos');
    const grid = document.querySelector('.produtos-grid');
    
    // Captura todos os cards originais
    const todosCards = Array.from(grid.children);
    const btnCarregarMais = document.createElement('button');
    btnCarregarMais.textContent = 'Carregar mais';
    btnCarregarMais.className = 'btn-carregar-mais';
    let produtosVisiveis = 6;

    function renderizarCards(cards) {
        grid.innerHTML = '';
        cards.slice(0, produtosVisiveis).forEach(card => grid.appendChild(card));
        if (cards.length > produtosVisiveis) {
            if (!btnCarregarMais.parentNode) grid.parentNode.appendChild(btnCarregarMais);
        } else {
            if (btnCarregarMais.parentNode) btnCarregarMais.parentNode.removeChild(btnCarregarMais);
        }
    }

    function filtrarEOrdenar() {
        let cards = todosCards.slice();
        // Filtro por busca
        const termo = inputBusca.value.trim().toLowerCase();
        if (termo) {
            cards = cards.filter(card => {
                const nome = card.querySelector('.produto-nome').textContent.toLowerCase();
                return nome.includes(termo);
            });
        }
        // Filtro por categoria
        const categoria = selectCategoria.value;
        if (categoria) {
            cards = cards.filter(card => card.querySelector('.produto-categoria').textContent === categoria);
        }
        // Filtro por marca
        const marca = selectMarca.value;
        if (marca) {
            cards = cards.filter(card => card.querySelector('.produto-marca').textContent === marca);
        }
        // Filtro por preço
        const precoMin = parseFloat(inputPrecoMin.value);
        const precoMax = parseFloat(inputPrecoMax.value);
        if (!isNaN(precoMin)) {
            cards = cards.filter(card => {
                const preco = parseFloat(card.querySelector('.preco-novo').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
                return preco >= precoMin;
            });
        }
        if (!isNaN(precoMax)) {
            cards = cards.filter(card => {
                const preco = parseFloat(card.querySelector('.preco-novo').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
                return preco <= precoMax;
            });
        }
        // Ordenação
        if (selectOrdenar.value === 'preco-asc') {
            cards.sort((a, b) => {
                const pa = parseFloat(a.querySelector('.preco-novo').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
                const pb = parseFloat(b.querySelector('.preco-novo').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
                return pa - pb;
            });
        } else if (selectOrdenar.value === 'preco-desc') {
            cards.sort((a, b) => {
                const pa = parseFloat(a.querySelector('.preco-novo').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
                const pb = parseFloat(b.querySelector('.preco-novo').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
                return pb - pa;
            });
        } else if (selectOrdenar.value === 'nome-az') {
            cards.sort((a, b) => a.querySelector('.produto-nome').textContent.localeCompare(b.querySelector('.produto-nome').textContent));
        } else if (selectOrdenar.value === 'nome-za') {
            cards.sort((a, b) => b.querySelector('.produto-nome').textContent.localeCompare(a.querySelector('.produto-nome').textContent));
        }
        // Atualiza grid
        renderizarCards(cards);
    }

    btnCarregarMais.addEventListener('click', function() {
        produtosVisiveis += 6;
        filtrarEOrdenar();
    });

    [inputBusca, selectCategoria, selectMarca, inputPrecoMin, inputPrecoMax, selectOrdenar].forEach(el => {
        if (el) el.addEventListener('input', filtrarEOrdenar);
        if (el && el.tagName === 'SELECT') el.addEventListener('change', filtrarEOrdenar);
    });

    filtrarEOrdenar(); // Render inicial
});
 // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
            });
        }
        // Feedback ao adicionar ao carrinho
    document.addEventListener('DOMContentLoaded', function() {

        const feedback = document.getElementById('feedback-carrinho');
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Salvar produto no localStorage
                const card = btn.closest('.produto-card');
                if (card) {
                    const nome = card.querySelector('.produto-nome')?.textContent?.trim() || '';
                    const precoStr = card.querySelector('.preco-novo')?.textContent?.replace('R$', '').replace('.', '').replace(',', '.') || '0';
                    const preco = parseFloat(precoStr);
                    const imagem = card.querySelector('img')?.getAttribute('src') || '';
                    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                    // Se já existe, soma quantidade
                    let idx = carrinho.findIndex(p => p.nome === nome && p.preco === preco);
                    if (idx >= 0) {
                        carrinho[idx].quantidade += 1;
                    } else {
                        carrinho.push({ nome, preco, imagem, quantidade: 1 });
                    }
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                }
                // Feedback visual
                if (feedback) {
                    feedback.style.display = 'block';
                    feedback.classList.add('ativo');
                    setTimeout(() => {
                        feedback.classList.remove('ativo');
                        feedback.style.display = 'none';
                    }, 1800);
                }
            });
        });
    });

    // Badge do carrinho sincronizado com localStorage
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
    document.addEventListener('DOMContentLoaded', function() {
        atualizarContadorCarrinho();
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', function() {
                let qtd = parseInt(localStorage.getItem('carrinhoQtd') || '0');
                localStorage.setItem('carrinhoQtd', qtd + 1);
                atualizarContadorCarrinho();
            });
        });
    });

    // Exibir resumo do último pedido se veio do checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pedido') === 'ok') {
        const ultimoPedido = JSON.parse(localStorage.getItem('ultimoPedido') || 'null');
        if (ultimoPedido && Array.isArray(ultimoPedido.itens) && ultimoPedido.itens.length > 0) {
            let html = `<div class="resumo-pedido-finalizado" style="background:#fffbe6;border:2px solid #ffd814;padding:18px 22px;border-radius:14px;box-shadow:0 2px 8px #ffd81422;margin-bottom:24px;max-width:600px;">
                <h2 style="color:#232f3e;font-size:1.25rem;margin-bottom:10px;"><i class='fa-solid fa-check' style='color:#059669;'></i> Pedido realizado com sucesso!</h2>
                <ul style="margin-bottom:10px;">
            `;
            ultimoPedido.itens.forEach(item => {
                html += `<li style='margin-bottom:6px;'><strong>${item.nome}</strong> — R$ ${item.preco.toFixed(2).replace('.',',')} <span style='color:#888;font-size:0.98em;'>(Qtd: ${item.qtd||item.quantidade||1})</span></li>`;
            });
            html += `</ul><div style='font-weight:700;color:#232f3e;'>Total: R$ ${ultimoPedido.total.toFixed(2).replace('.',',')}</div>`;
            html += `</div>`;
            const main = document.querySelector('main, .container, body');
            if(main) main.insertAdjacentHTML('afterbegin', html);
            // Limpa o resumo após exibir
            localStorage.removeItem('ultimoPedido');
        }
    }