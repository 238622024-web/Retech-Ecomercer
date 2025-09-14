// Mostrar/ocultar senha com ícone de olho

document.addEventListener('DOMContentLoaded', function() {
  const senhaInput = document.getElementById('senha');
  const toggle = document.querySelector('.toggle-password');
  const icone = document.getElementById('icone-olho');
  if (senhaInput && toggle && icone) {
    toggle.addEventListener('click', function() {
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        icone.classList.remove('fa-eye');
        icone.classList.add('fa-eye-slash');
      } else {
        senhaInput.type = 'password';
        icone.classList.remove('fa-eye-slash');
        icone.classList.add('fa-eye');
      }
    });
  }
});

// Preview da imagem do produto

document.addEventListener('DOMContentLoaded', function() {
  const inputImagem = document.getElementById('imagem');
  const preview = document.getElementById('preview-imagem');
  if (inputImagem && preview) {
    inputImagem.addEventListener('change', function(e) {
      preview.innerHTML = '';
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.style.maxWidth = '180px';
        img.style.maxHeight = '180px';
        img.style.borderRadius = '10px';
        img.style.boxShadow = '0 2px 8px #232f3e22';
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
      }
    });
  }
});
