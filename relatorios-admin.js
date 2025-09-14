// JS exclusivo para relatorios-admin.html extraído do inline
async function carregarRelatorios() {
    const vendasResp = await fetch("http://localhost:3000/api/relatorios/vendas");
    const vendas = await vendasResp.json();

    document.getElementById("totalPedidos").innerText = vendas.pedidos;
    document.getElementById("totalClientes").innerText = vendas.clientes;
    document.getElementById("totalVendas").innerText = "R$ " + vendas.totalVendas.toFixed(2);

    const semanaResp = await fetch("http://localhost:3000/api/relatorios/semana");
    const semana = await semanaResp.json();

    let lista = document.getElementById("vendasSemana");
    lista.innerHTML = "";
    for (let dia in semana) {
        lista.innerHTML += `<li>${dia}: R$ ${semana[dia].toFixed(2)}</li>`;
    }
}

window.onload = carregarRelatorios;
