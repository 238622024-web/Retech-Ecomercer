// JS extraído de index.html
// Ofertas do Dia
fetch('ofertas.json')
    .then(response => response.json())
    .then(ofertas => {
        const container = document.getElementById('ofertas-cards');
        if (!container) return;
        if (ofertas.length === 0) {
            container.innerHTML = '<p style="color:#888;text-align:center;">Nenhuma oferta disponível no momento.</p>';
            return;
        }
        container.innerHTML = ofertas.map(oferta => `
            <div class="oferta-card">
                <img src="${oferta.imagem}" alt="${oferta.nome}">
                <h3>${oferta.nome}</h3>
                <span class="preco-antigo">${oferta.precoAntigo}</span>
                <span class="preco-novo">${oferta.precoNovo}</span>
                <button class="btn-comprar"><i class="fa-solid fa-cart-plus"></i> Comprar</button>
            </div>
        `).join('');
    })
    .catch(() => {
        const container = document.getElementById('ofertas-cards');
        if (container) container.innerHTML = '<p style="color:#888;text-align:center;">Erro ao carregar ofertas.</p>';
    });

// Carrossel visual premium
document.addEventListener('DOMContentLoaded', function() {
    let slideAtual = 0;
    const slides = document.querySelectorAll('.carrossel-slide');
    const indicadores = document.querySelectorAll('.indicador');
    const btnPrev = document.querySelector('.carrossel-btn.prev');
    const btnNext = document.querySelector('.carrossel-btn.next');
    let intervalo = null;
    let pausado = false;

    function mostrarSlide(n) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if(i === n) slide.classList.add('active');
        });
        indicadores.forEach((ind, i) => {
            ind.classList.remove('active');
            if(i === n) ind.classList.add('active');
        });
    }
    function mudarSlide(dir) {
        slideAtual += dir;
        if(slideAtual < 0) slideAtual = slides.length - 1;
        if(slideAtual >= slides.length) slideAtual = 0;
        mostrarSlide(slideAtual);
    }
    function iniciarAutoplay() {
        if(intervalo) clearInterval(intervalo);
        intervalo = setInterval(() => {
            if(!pausado) mudarSlide(1);
        }, 6000);
    }
    if(btnPrev && btnNext) {
        btnPrev.addEventListener('click', function() { mudarSlide(-1); });
        btnNext.addEventListener('click', function() { mudarSlide(1); });
    }
    indicadores.forEach((ind, i) => {
        ind.addEventListener('click', function() {
            slideAtual = i;
            mostrarSlide(slideAtual);
        });
    });
    // Pausa autoplay ao interagir
    document.querySelector('.carrossel').addEventListener('mouseenter', function() { pausado = true; });
    document.querySelector('.carrossel').addEventListener('mouseleave', function() { pausado = false; });
    document.querySelector('.carrossel').addEventListener('focusin', function() { pausado = true; });
    document.querySelector('.carrossel').addEventListener('focusout', function() { pausado = false; });
    mostrarSlide(slideAtual);
    iniciarAutoplay();

    // Menu hambúrguer responsivo
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.getElementById('main-nav');
    menuToggle.addEventListener('click', function() {
        const aberto = navBar.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', aberto);
    });
    document.addEventListener('click', function(e) {
        if(window.innerWidth <= 700 && navBar.classList.contains('open')) {
            if(!navBar.contains(e.target) && !menuToggle.contains(e.target)) {
                navBar.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', false);
            }
        }
    });
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape' && navBar.classList.contains('open')) {
            navBar.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
});