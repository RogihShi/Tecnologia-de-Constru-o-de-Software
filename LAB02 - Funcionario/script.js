class Funcionario {
    constructor(nome, idade, cargo, salario) {
      this.nome = nome;
      this.idade = idade;
      this.cargo = cargo;
      this.salario = salario;
    }
  
    getNome = () => this.nome;
    setNome = (nome) => { this.nome = nome; };
  
    getIdade = () => this.idade;
    setIdade = (idade) => { this.idade = idade; };
  
    getCargo = () => this.cargo;
    setCargo = (cargo) => { this.cargo = cargo; };
  
    getSalario = () => this.salario;
    setSalario = (salario) => { this.salario = salario; };
  
    toString = () => `${this.nome} - ${this.idade} anos - ${this.cargo} - R$ ${this.salario.toFixed(2)}`;
  }
  
  const funcionarios = [];
  let indiceEditando = null;
  
  const form = document.getElementById('formFuncionario');
  const nomeInput = document.getElementById('nome');
  const idadeInput = document.getElementById('idade');
  const cargoInput = document.getElementById('cargo');
  const salarioInput = document.getElementById('salario');
  const tbody = document.getElementById('tabelaFuncionarios').querySelector('tbody');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value);
    const cargo = cargoInput.value;
    const salario = parseFloat(salarioInput.value);
  
    if (indiceEditando === null) {
      funcionarios.push(new Funcionario(nome, idade, cargo, salario));
    } else {
      const funcionario = funcionarios[indiceEditando];
      funcionario.setNome(nome);
      funcionario.setIdade(idade);
      funcionario.setCargo(cargo);
      funcionario.setSalario(salario);
      indiceEditando = null;
    }
  
    atualizarTabela();
    form.reset();
  });
  
  const atualizarTabela = () => {
    tbody.innerHTML = '';
  
    funcionarios.forEach((funcionario, index) => {
      const linha = document.createElement('tr');
  
      linha.innerHTML = `
        <td>${funcionario.getNome()}</td>
        <td>${funcionario.getIdade()}</td>
        <td>${funcionario.getCargo()}</td>
        <td>R$ ${funcionario.getSalario().toFixed(2)}</td>
        <td>
          <button id="editar-${index}">Editar</button>
          <button id="excluir-${index}">Excluir</button>
        </td>
      `;
  
      tbody.appendChild(linha);
  
      document.getElementById(`editar-${index}`).onclick = () => {
        nomeInput.value = funcionario.getNome();
        idadeInput.value = funcionario.getIdade();
        cargoInput.value = funcionario.getCargo();
        salarioInput.value = funcionario.getSalario();
        indiceEditando = index;
      };
  
      document.getElementById(`excluir-${index}`).onclick = () => {
        funcionarios.splice(index, 1);
        atualizarTabela();
      };
    });
  
    atualizarRelatorios();
  };
  
  const atualizarRelatorios = () => {
    const relatoriosDiv = document.getElementById('relatorios');
  
    const salarioAlto = funcionarios.filter(f => f.getSalario() > 5000);
    const totalSalario = funcionarios.reduce((total, f) => total + f.getSalario(), 0);
    const mediaSalario = funcionarios.length > 0 ? (totalSalario / funcionarios.length).toFixed(2) : 0;
    const cargosUnicos = [...new Set(funcionarios.map(f => f.getCargo()))];
    const nomesMaiusculo = funcionarios.map(f => f.getNome().toUpperCase());
  
    relatoriosDiv.innerHTML = `
      <p><strong>Funcionários com salário maior que R$ 5000:</strong></p>
      <ul>${salarioAlto.map(f => `<li>${f.toString()}</li>`).join('')}</ul>
  
      <p><strong>Média Salarial:</strong> R$ ${mediaSalario}</p>
  
      <p><strong>Cargos Únicos:</strong> ${cargosUnicos.join(', ')}</p>
  
      <p><strong>Nomes em Maiúsculo:</strong> ${nomesMaiusculo.join(', ')}</p>
    `;
  };
  