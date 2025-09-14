// JS extraído de contato.html
const formContato = document.getElementById("formContato");
const contatoAlerta = document.getElementById("contato-alerta");
if (formContato && contatoAlerta) {
    formContato.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dados = {
            nome: e.target.nome.value,
            email: e.target.email.value,
            mensagem: e.target.mensagem.value
        };
        try {
            await fetch("http://localhost:3000/api/contato", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });
            contatoAlerta.style.display = "block";
            setTimeout(()=>{ contatoAlerta.style.display = 'none'; }, 2000);
            formContato.reset();
        } catch (err) {
            alert('Erro ao enviar mensagem.');
        }
    });
}
