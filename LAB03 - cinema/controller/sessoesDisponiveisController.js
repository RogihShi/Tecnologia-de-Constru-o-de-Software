const tabela = document.getElementById('listaSessoes');

const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]');
const filmes = JSON.parse(localStorage.getItem('filmes') || '[]');
const salas = JSON.parse(localStorage.getItem('salas') || '[]');

const buscarNomeFilme = id => filmes.find(f => f.id == id)?.titulo || 'Filme não encontrado';
const buscarNomeSala = id => salas.find(s => s.id == id)?.nome || 'Sala não encontrada';

sessoes.forEach(sessao => {
  const linha = document.createElement('tr');
  linha.innerHTML = `
    <td>${buscarNomeFilme(sessao.filme)}</td>
    <td>${buscarNomeSala(sessao.sala)}</td>
    <td>${new Date(sessao.dataHora).toLocaleString()}</td>
    <td>R$ ${Number(sessao.preco).toFixed(2)}</td>
    <td>
      <a href="venda-ingressos.html?sessao=${sessao.id}" class="btn btn-primary btn-sm">Comprar Ingresso</a>
    </td>
  `;
  tabela.appendChild(linha);
});
