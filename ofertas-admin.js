// Preview da imagem selecionada
document.getElementById('imagem').addEventListener('change', function(e) {
  const preview = document.getElementById('preview-imagem-oferta');
  preview.innerHTML = '';
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      const img = document.createElement('img');
      img.src = ev.target.result;
      img.alt = 'Preview da imagem';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Carregar ofertas do JSON
let ofertas = [];
function renderOfertas() {
  const list = document.getElementById('ofertas-list');
  if (ofertas.length === 0) {
    list.innerHTML = '<p style="color:#888;text-align:center;">Nenhuma oferta cadastrada.</p>';
    return;
  }
  list.innerHTML = ofertas.map((oferta, idx) => `
    <div class="oferta-admin-card">
      <img src="${oferta.imagem}" alt="${oferta.nome}">
      <div class="info">
        <strong>${oferta.nome}</strong><br>
        <span class="preco-antigo">${oferta.precoAntigo}</span>
        <span class="preco-novo">${oferta.precoNovo}</span>
      </div>
      <div class="actions">
        <button title="Remover" onclick="removerOferta(${idx})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}
function salvarOfertas() {
  localStorage.setItem('ofertas-admin', JSON.stringify(ofertas));
}
function carregarOfertas() {
  const local = localStorage.getItem('ofertas-admin');
  if (local) {
    ofertas = JSON.parse(local);
  } else {
    fetch('ofertas.json').then(r => r.json()).then(data => { ofertas = data; salvarOfertas(); renderOfertas(); });
  }
  renderOfertas();
}
function removerOferta(idx) {
  if (confirm('Remover esta oferta?')) {
    ofertas.splice(idx, 1);
    salvarOfertas();
    renderOfertas();
  }
}
document.getElementById('oferta-form').onsubmit = function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const imagem = document.getElementById('imagem').value.trim();
  const precoAntigo = document.getElementById('precoAntigo').value.trim();
  const precoNovo = document.getElementById('precoNovo').value.trim();
  if (!nome || !imagem || !precoAntigo || !precoNovo) return;
  ofertas.push({ nome, imagem, precoAntigo, precoNovo });
  salvarOfertas();
  renderOfertas();
  this.reset();
};
carregarOfertas();
