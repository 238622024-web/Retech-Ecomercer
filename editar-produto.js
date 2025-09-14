// JS extraído de editar-produto.html
const formEditarProduto = document.getElementById("formEditarProduto");
if (formEditarProduto) {
    formEditarProduto.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = 1; // 🔹 aqui você pode pegar da URL (?id=123)
        const formData = new FormData(e.target);
        try {
            const resp = await fetch(`http://localhost:3000/api/produtos/${id}`, {
                method: "PUT",
                body: formData
            });
            await resp.json();
            document.getElementById("alerta-sucesso").style.display = "block";
            setTimeout(()=>{ document.getElementById('alerta-sucesso').style.display = 'none'; }, 2000);
        } catch (err) {
            alert('Erro ao editar produto.');
        }
    });
}
