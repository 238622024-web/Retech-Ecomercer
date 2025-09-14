// JS extraído de detalhes-produto.html
// Galeria de imagens
document.querySelectorAll('.miniaturas img').forEach(mini => {
    mini.addEventListener('click', function() {
        document.getElementById('img-principal').src = this.src;
        document.querySelectorAll('.miniaturas img').forEach(m => m.classList.remove('selecionada'));
        this.classList.add('selecionada');
    });
});

// Toast visual
function mostrarToast(msg) {
    const toast = document.getElementById('toast-notificacao') || document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 400);
    }, 1800);
}

// Favoritar produto
const btnFav = document.getElementById('btnFavorito');
if(btnFav) {
    btnFav.addEventListener('click', function() {
        btnFav.classList.toggle('ativo');
        btnFav.querySelector('i').classList.toggle('fa-regular');
        btnFav.querySelector('i').classList.toggle('fa-solid');
        mostrarToast(btnFav.classList.contains('ativo') ? 'Produto adicionado aos favoritos!' : 'Produto removido dos favoritos!');
    });
}

// Adicionar ao carrinho
const btnCarrinho = document.querySelector('.btn-carrinho');
if(btnCarrinho) {
    btnCarrinho.addEventListener('click', function() {
        mostrarToast('Produto adicionado ao carrinho!');
    });
}

// Avaliação interativa
const formAvaliacao = document.getElementById('formAvaliacao');
if(formAvaliacao) {
    formAvaliacao.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nomeAvaliador').value.trim();
        const nota = document.getElementById('notaAvaliacao').value;
        const texto = document.getElementById('textoAvaliacao').value.trim();
        if(nome && texto) {
            const div = document.createElement('div');
            div.style.marginBottom = '16px';
            div.innerHTML = `<strong>${nome}</strong> <span style='color:#ffd814;'>${'★'.repeat(nota)}${'☆'.repeat(5-nota)}</span><p style='margin:4px 0 0 0; color:#444;'>${texto}</p>`;
            document.querySelector('.avaliacoes-lista').appendChild(div);
            mostrarToast('Avaliação enviada!');
            this.reset();
        }
    });
}
