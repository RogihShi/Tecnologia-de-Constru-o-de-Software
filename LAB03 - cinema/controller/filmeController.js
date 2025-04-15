import { Filme } from "../model/filme.js";

class FilmeController {
  constructor() {
    this.listaFilmes = [];
    this.idEmEdicao = null;
    this.idParaExcluir = null;
    this.init();
  }

  init() {
    const btnNovo = document.getElementById("btnNovo");
    const btnSalvarFilme = document.getElementById("btnSalvarFilme");
    const btnCancelar = document.querySelector(".btn-secondary[data-bs-dismiss='modal']");
    const btnExcluirFilme = document.getElementById("btnExcluirFilme");

    if (btnNovo) btnNovo.addEventListener("click", this.abrirModalCadastro.bind(this));
    if (btnSalvarFilme) btnSalvarFilme.addEventListener("click", this.salvar.bind(this));
    if (btnCancelar) btnCancelar.addEventListener("click", () => {
      this.limparFormulario();
      this.fecharModal("idModalFilme");
    });
    if (btnExcluirFilme) btnExcluirFilme.addEventListener("click", () => this.excluir(this.idParaExcluir));

    this.carregarFilmesDoLocalStorage();
  }

  salvar() {
    const filme = this.criarFilmeDoFormulario();

    if (!filme.titulo || !filme.genero || isNaN(filme.classificacao)) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (this.idEmEdicao) {
      const index = this.listaFilmes.findIndex(f => f.id === this.idEmEdicao);
      this.listaFilmes[index] = filme;
    } else {
      this.listaFilmes.push(filme);
    }

    this.salvarNoLocalStorage();
    this.atualizarTabela();
    this.fecharModal("idModalFilme");
  }

  criarFilmeDoFormulario() {
    return new Filme(
      this.idEmEdicao || Date.now(),
      document.getElementById("titulo").value.trim(),
      document.getElementById("genero").value.trim(),
      parseInt(document.getElementById("classificacao").value),
      document.getElementById("duracao").value.trim(),
      document.getElementById("dataEstreia").value
    );
  }

  salvarNoLocalStorage() {
    localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
  }

  carregarFilmesDoLocalStorage() {
    const filmesSalvos = localStorage.getItem("filmes");
    if (filmesSalvos) {
      this.listaFilmes = JSON.parse(filmesSalvos);
      this.atualizarTabela();
    }
  }

  atualizarTabela() {
    const tbody = document.querySelector("tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    this.listaFilmes.forEach(filme => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${filme.id}</td>
        <td><strong>${filme.titulo}</strong></td>
        <td>${filme.genero}</td>
        <td>${filme.classificacao}</td>
        <td>${filme.duracao}</td>
        <td>${this.formatarData(filme.dataEstreia)}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar" data-id="${filme.id}">
            <i class="bi bi-pencil-square"></i>
          </button>
          &nbsp;
          <button class="btn btn-danger btn-sm btn-excluir" data-id="${filme.id}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(filme));
      tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(filme.id));
    });
  }

  excluir(id) {
    this.listaFilmes = this.listaFilmes.filter(filme => filme.id !== id);
    this.salvarNoLocalStorage();
    this.atualizarTabela();

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalExcluirFilme"));
    if (modal) modal.hide();
  }

  abrirModalCadastro() {
    this.limparFormulario();
    this.idEmEdicao = null;
    document.getElementById("idModalFilmeTitulo").textContent = "Cadastrar Filme";
    new bootstrap.Modal(document.getElementById("idModalFilme")).show();
  }

  abrirModalEdicao(filme) {
    this.idEmEdicao = filme.id;
    document.getElementById("titulo").value = filme.titulo;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("classificacao").value = filme.classificacao;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("dataEstreia").value = filme.dataEstreia;

    document.getElementById("idModalFilmeTitulo").textContent = "Editar Filme";
    new bootstrap.Modal(document.getElementById("idModalFilme")).show();
  }

  abrirModalExcluir(id) {
    this.idParaExcluir = id;
    new bootstrap.Modal(document.getElementById("modalExcluirFilme")).show();
  }

  limparFormulario() {
    const form = document.getElementById("formFilme");
    if (form) form.reset();
    this.idEmEdicao = null;
  }

  fecharModal(modalId) {
    const modalElement = document.getElementById(modalId);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) modalInstance.hide();

    document.body.classList.remove("modal-open");
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  }

  formatarData(data) {
    const d = new Date(data);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("pt-BR");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FilmeController();
});