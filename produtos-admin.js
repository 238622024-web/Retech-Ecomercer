// produtos-admin.js
// Confirmação de exclusão
let produtoParaRemover = null;
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.admin-actions .fa-trash').forEach(function(btn) {
        btn.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            produtoParaRemover = btn.closest('tr');
            document.getElementById('modal-confirmar').style.display = 'flex';
        });
    });
    document.getElementById('btn-cancelar').onclick = function() {
        document.getElementById('modal-confirmar').style.display = 'none';
        produtoParaRemover = null;
    };
    document.getElementById('btn-confirmar').onclick = function() {
        if(produtoParaRemover) {
            produtoParaRemover.remove();
            produtoParaRemover = null;
            document.getElementById('modal-confirmar').style.display = 'none';
            let alerta = document.getElementById('alerta-sucesso');
            alerta.style.display = 'block';
            setTimeout(()=>{ alerta.style.display = 'none'; }, 2000);
        }
    };

    // Carregamento de produtos (mock/futuro backend)
    if (typeof carregarProdutos === 'function') {
        window.onload = carregarProdutos;
    }
});

// Funções para integração futura
async function carregarProdutos() {
    // Exemplo de fetch para API (ajuste conforme backend)
    // const resp = await fetch("http://localhost:3000/api/produtos");
    // const produtos = await resp.json();
    // ...
}

async function excluirProduto(id) {
    if (!confirm("Excluir produto?")) return;
    // await fetch(`http://localhost:3000/api/produtos/${id}`, { method: "DELETE" });
    carregarProdutos();
}

function editarProduto(id) {
    window.location.href = `editar-produto.html?id=${id}`;
}
   document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.getElementById('menu-toggle');
      const nav = document.getElementById('main-nav');
      if (toggle && nav) {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
          nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', toggle.classList.contains('active'));
        });
      }
    });