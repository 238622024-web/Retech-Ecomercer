document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo do header
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.getElementById('main-nav');
    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', function() {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            navBar.classList.toggle('active');
        });
    }

    // Mostrar/ocultar senha
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.onclick = function() {
            const pwd = document.getElementById('password');
            const eye = document.getElementById('eyeIcon');
            if (pwd.type === 'password') {
                pwd.type = 'text';
                eye.classList.remove('fa-eye');
                eye.classList.add('fa-eye-slash');
            } else {
                pwd.type = 'password';
                eye.classList.remove('fa-eye-slash');
                eye.classList.add('fa-eye');
            }
        };
    }

    // Feedback visual de login
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            var email = document.getElementById('email').value.trim();
            var senha = document.getElementById('password').value.trim();
            var tipoAcesso = document.getElementById('tipoAcesso').value;
            var alerta = document.getElementById('login-alerta');
            var btn = document.getElementById('loginBtn');
            var btnText = document.getElementById('loginBtnText');
            var btnLoading = document.getElementById('loginBtnLoading');
            alerta.style.display = 'none';
            btn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            setTimeout(function() {
                btn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                if(email === '' || senha === '') {
                    showNotification('Preencha todos os campos.', false);
                } else if(tipoAcesso === 'adm' && email === 'admin@retech.com' && senha === 'admin123') {
                    showNotification('Login de administrador realizado com sucesso!', true);
                    setTimeout(()=>{ window.location.href = 'adm.html'; }, 1500);
                } else if(tipoAcesso === 'cliente' && email !== '' && senha !== '') {
                    showNotification('Login de cliente realizado com sucesso!', true);
                    setTimeout(()=>{ window.location.href = 'perfil.html'; }, 1500);
                } else {
                    showNotification('E-mail ou senha inválidos.', false);
                }
            }, 900);
        };

        // Função para exibir notificação visual melhorada
        function showNotification(msg, success) {
            var alerta = document.getElementById('login-alerta');
            alerta.innerHTML = `<span style="font-size:1.1em;font-weight:600;vertical-align:middle;">${success ? '✔️' : '❌'} ${msg}</span>`;
            alerta.style.background = success ? '#059669' : '#b12704';
            alerta.style.color = '#fff';
            alerta.style.borderRadius = '6px';
            alerta.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
            alerta.style.display = 'block';
            alerta.style.textAlign = 'center';
            alerta.style.padding = '12px 0';
            alerta.style.transition = 'all 0.3s';
        }
    }
});
