document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            const isExpanded = mainNav.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE CHECKOUT ---
    const form = document.getElementById('checkout-form');
    if (!form) return;

    const paymentTabs = document.querySelectorAll('.payment-tab');
    const paymentForms = document.querySelectorAll('.payment-form');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonLoader = document.getElementById('button-loader');
    const successModal = document.getElementById('success-message');
    let paymentMethod = 'cartao';

    paymentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            paymentTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            paymentMethod = tab.dataset.method;

            paymentForms.forEach(pForm => {
                pForm.classList.remove('active');
                if (pForm.id === `form-${paymentMethod}`) {
                    pForm.classList.add('active');
                }
            });
            setRequiredForPayment(paymentMethod === 'cartao');
        });
    });
    
    function setRequiredForPayment(isRequired) {
        ['card-number', 'card-name', 'card-expiry', 'card-cvv'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.required = isRequired;
        });
    }
    setRequiredForPayment(true); // Cartão é o padrão

    const showError = (id, message) => {
        const input = document.getElementById(id);
        const errorEl = document.getElementById(`${id}-error`);
        if(input) input.classList.add('input-error');
        if(errorEl) { errorEl.textContent = message; errorEl.style.display = 'block'; }
    };

    const clearError = (id) => {
        const input = document.getElementById(id);
        const errorEl = document.getElementById(`${id}-error`);
        if(input) input.classList.remove('input-error');
        if(errorEl) errorEl.style.display = 'none';
    };

    const validateForm = () => {
        let isValid = true;
        const requiredFields = Array.from(form.querySelectorAll('[required]'));
        
        requiredFields.forEach(input => clearError(input.id));

        for (const input of requiredFields) {
            if (!input.value.trim()) {
                showError(input.id, 'Campo obrigatório.');
                isValid = false;
            }
        }

        // Validações específicas
        if (paymentMethod === 'cartao') {
            if (document.getElementById('card-number').value.replace(/\D/g, '').length < 13) { showError('card-number', 'Número de cartão inválido.'); isValid = false; }
            if (!/^(0[1-9]|1[0-2])\s?\/\s?([0-9]{2})$/.test(document.getElementById('card-expiry').value)) { showError('card-expiry', 'Data de validade inválida (MM/AA).'); isValid = false; }
            if (document.getElementById('card-cvv').value.replace(/\D/g, '').length < 3) { showError('card-cvv', 'CVV inválido.'); isValid = false; }
        }
        return isValid;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            buttonText.classList.add('hidden');
            buttonLoader.classList.remove('hidden');
            submitButton.disabled = true;

            setTimeout(() => {
                document.getElementById('checkout-container').style.display = 'none';
                successModal.style.display = 'flex';
                document.getElementById('order-number').textContent = `#${Math.floor(Math.random() * 90000) + 10000}ABC`;
                document.getElementById('success-payment-method').textContent = paymentMethod === 'boleto' ? 'O boleto foi enviado para o seu e-mail.' : 'Pagamento com cartão aprovado com sucesso.';
            }, 1500);
        } else {
             const firstErrorField = form.querySelector('.input-error');
             if (firstErrorField) firstErrorField.focus();
        }
    });

    // --- MÁSCARAS DE INPUT ---
    const applyMask = (element, maskFunction) => {
        if(element) element.addEventListener('input', (e) => { e.target.value = maskFunction(e.target.value); });
    };
    
    applyMask(document.getElementById('cep'), v => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9));
    
    applyMask(document.getElementById('telefone'), v => {
        v = v.replace(/\D/g, '');
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
        return v.substring(0, 15);
    });

    applyMask(document.getElementById('card-number'), v => v.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19));
    
    applyMask(document.getElementById('card-expiry'), v => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5));
    
    applyMask(document.getElementById('card-cvv'), v => v.replace(/\D/g, '').substring(0, 4));
});
// JS extraído de checkout.html