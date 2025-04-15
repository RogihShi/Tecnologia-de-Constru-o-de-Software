// Carrega as sessões no select
function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
  
    const selectSessao = document.getElementById("sessao");
    sessoes.forEach((sessao, index) => {
      const filme = filmes.find(f => f.id == sessao.filme || f.titulo == sessao.filme);
      const sala = salas.find(s => s.id == sessao.sala || s.nome == sessao.sala);
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${filme?.titulo || "Filme"} - ${sala?.nome || "Sala"} - ${sessao.dataHora}`;
      selectSessao.appendChild(option);
    });
  }
  
  // Lógica de venda
  document.getElementById("formIngresso").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const sessaoIndex = parseInt(document.getElementById("sessao").value);
    const nomeCliente = document.getElementById("nomeCliente").value;
    const cpf = document.getElementById("cpf").value;
    const assento = parseInt(document.getElementById("assento").value);
    const tipoPagamento = document.getElementById("tipoPagamento").value;
  
    const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const ingressos = JSON.parse(localStorage.getItem("ingressos")) || [];
  
    const sessaoSelecionada = sessoes[sessaoIndex];
    const sala = salas.find(s => s.id == sessaoSelecionada.sala || s.nome == sessaoSelecionada.sala);
  
    if (!sala || assento > sala.capacidade || assento < 1) {
      alert(`Assento inválido! Esta sala suporta até ${sala?.capacidade || "N/A"} lugares.`);
      return;
    }
  
    const ocupados = ingressos.filter(i => i.sessaoIndex === sessaoIndex).map(i => i.assento);
    if (ocupados.includes(assento)) {
      alert("Esse assento já está ocupado.");
      return;
    }
  
    const ingresso = {
      sessaoIndex,
      nomeCliente,
      cpf,
      assento,
      tipoPagamento,
      dataHora: new Date().toISOString()
    };
  
    ingressos.push(ingresso);
    localStorage.setItem("ingressos", JSON.stringify(ingressos));
  
    alert("Ingresso vendido com sucesso!");
    this.reset();
  });
  
  // Inicialização
  carregarSessoes();
  