// JS extraído de esqueceu-senha.html
const form = document.querySelector('.esqsenha-form');
const emailInput = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
if (form && emailInput && mensagem) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mensagem.style.display = 'none';
        const email = emailInput.value.trim();
        // Validação simples de e-mail
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            emailInput.style.border = '1.5px solid #c7511f';
            mensagem.innerHTML = '<span style="font-size:1.1em;font-weight:600;vertical-align:middle;">❌ Digite um e-mail válido.</span>';
            mensagem.style.color = '#c7511f';
            mensagem.style.background = '#fff8f6';
            mensagem.style.borderRadius = '6px';
            mensagem.style.boxShadow = '0 2px 8px rgba(199,81,31,0.08)';
            mensagem.style.opacity = '0';
            mensagem.style.display = 'block';
            setTimeout(()=>{ mensagem.style.opacity = '1'; mensagem.style.transition = 'opacity 0.5s'; }, 10);
            return;
        }
        emailInput.style.border = '1.5px solid #ffd814';
        mensagem.innerHTML = '<span style="font-size:1.1em;font-weight:600;vertical-align:middle;">✔️ Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.</span>';
        mensagem.style.color = '#059669';
        mensagem.style.background = '#f0fdf4';
        mensagem.style.borderRadius = '6px';
        mensagem.style.boxShadow = '0 2px 8px rgba(5,150,105,0.08)';
        mensagem.style.opacity = '0';
        mensagem.style.display = 'block';
        setTimeout(()=>{ mensagem.style.opacity = '1'; mensagem.style.transition = 'opacity 0.5s'; }, 10);
        // Aqui você pode adicionar lógica para enviar o e-mail via backend
    });
    emailInput.addEventListener('input', function() {
        emailInput.style.border = '1.5px solid #e3e6e8';
        mensagem.style.display = 'none';
    });
}
