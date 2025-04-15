let filmes = [];
let salas = [];

function carregarFilmesESalas() {
  filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  salas = JSON.parse(localStorage.getItem("salas")) || [];

  const selectFilme = document.getElementById("filme");
  const selectSala = document.getElementById("sala");

  filmes.forEach(filme => {
    const option = document.createElement("option");
    option.value = filme.id || filme.titulo;
    option.textContent = filme.titulo;
    selectFilme.appendChild(option);
  });

  salas.forEach(sala => {
    const option = document.createElement("option");
    option.value = sala.id || sala.nome;
    option.textContent = sala.nome;
    selectSala.appendChild(option);
  });
}

document.getElementById("formSessao").addEventListener("submit", function(event) {
  event.preventDefault();

  const sessao = {
    id: Date.now(),
    filme: document.getElementById("filme").value,
    sala: document.getElementById("sala").value,
    dataHora: document.getElementById("dataHora").value,
    preco: parseFloat(document.getElementById("preco").value),
    idioma: document.getElementById("idioma").value,
    formato: document.getElementById("formato").value
  };

  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  sessoes.push(sessao);
  localStorage.setItem("sessoes", JSON.stringify(sessoes));

  alert("Sessão cadastrada com sucesso!");
  this.reset();
  exibirSessoes();
});

function exibirSessoes() {
  const lista = document.getElementById("listaSessoes");
  lista.innerHTML = "";

  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

  sessoes.forEach(sessao => {
    const nomeFilme = (filmes.find(f => f.id == sessao.filme || f.titulo == sessao.filme) || {}).titulo || sessao.filme;
    const nomeSala = (salas.find(s => s.id == sessao.sala || s.nome == sessao.sala) || {}).nome || sessao.sala;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>Filme:</strong> ${nomeFilme} |
        <strong>Sala:</strong> ${nomeSala} |
        <strong>Data:</strong> ${new Date(sessao.dataHora).toLocaleString()} |
        <strong>Idioma:</strong> ${sessao.idioma} |
        <strong>Formato:</strong> ${sessao.formato}
      </div>
      <button class="btn btn-sm btn-danger" onclick="excluirSessao(${sessao.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}

window.excluirSessao = function(id) {
  let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  sessoes = sessoes.filter(sessao => sessao.id !== id);
  localStorage.setItem("sessoes", JSON.stringify(sessoes));
  exibirSessoes();
};

// Inicialização
carregarFilmesESalas();
exibirSessoes();
