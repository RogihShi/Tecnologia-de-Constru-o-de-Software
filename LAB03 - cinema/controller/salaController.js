import { Sala } from "../model/sala.js";

class SalaController {
  constructor() {
    this.listaSalas = [];
    this.idEmEdicao = null;
    this.idParaExcluir = null;
    this.init();
  }

  init() {
    const btnNovo = document.getElementById("btnNovaSala");
    const btnSalvarSala = document.getElementById("btnSalvarSala");
    const btnCancelar = document.querySelector(".btn-secondary[data-bs-dismiss='modal']");
    const btnExcluirSala = document.getElementById("btnExcluirSalaConfirmar");

    if (btnNovo) btnNovo.addEventListener("click", this.abrirModalCadastro.bind(this));
    if (btnSalvarSala) btnSalvarSala.addEventListener("click", this.salvar.bind(this));
    if (btnCancelar) btnCancelar.addEventListener("click", () => {
      this.limparFormulario();
      this.fecharModal("idModalSala");
    });
    if (btnExcluirSala) btnExcluirSala.addEventListener("click", () => this.excluir(this.idParaExcluir));

    this.carregarSalasDoLocalStorage();
  }

  salvar() {
    const sala = this.criarSalaDoFormulario();

    if (!sala.nome || isNaN(sala.capacidade) || !sala.tipo) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (this.idEmEdicao) {
      const index = this.listaSalas.findIndex(s => s.id === this.idEmEdicao);
      this.listaSalas[index] = sala;
    } else {
      this.listaSalas.push(sala);
    }

    this.salvarNoLocalStorage();
    this.atualizarTabela();
    this.fecharModal("idModalSala");
  }

  criarSalaDoFormulario() {
    return new Sala(
      this.idEmEdicao || Date.now(),
      document.getElementById("nomeSala").value.trim(),
      parseInt(document.getElementById("capacidadeSala").value),
      document.getElementById("tipoSala").value.trim()
    );
  }

  salvarNoLocalStorage() {
    localStorage.setItem("salas", JSON.stringify(this.listaSalas));
  }

  carregarSalasDoLocalStorage() {
    const salasSalvas = localStorage.getItem("salas");
    if (salasSalvas) {
      this.listaSalas = JSON.parse(salasSalvas);
      this.atualizarTabela();
    }
  }

  atualizarTabela() {
    const tbody = document.querySelector("tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    this.listaSalas.forEach(sala => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${sala.id}</td>
        <td><strong>${sala.nome}</strong></td>
        <td>${sala.capacidade}</td>
        <td>${sala.tipo}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar" data-id="${sala.id}">
            <i class="bi bi-pencil-square"></i>
          </button>
          &nbsp;
          <button class="btn btn-danger btn-sm btn-excluir" data-id="${sala.id}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);

      tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(sala));
      tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(sala.id));
    });
  }

  excluir(id) {
    this.listaSalas = this.listaSalas.filter(sala => sala.id !== id);
    this.salvarNoLocalStorage();
    this.atualizarTabela();

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalExcluirSala"));
    if (modal) modal.hide();
  }

  abrirModalCadastro() {
    this.limparFormulario();
    this.idEmEdicao = null;
    document.getElementById("idModalSalaTitulo").textContent = "Cadastrar Sala";
    new bootstrap.Modal(document.getElementById("idModalSala")).show();
  }

  abrirModalEdicao(sala) {
    this.idEmEdicao = sala.id;
    document.getElementById("nomeSala").value = sala.nome;
    document.getElementById("capacidadeSala").value = sala.capacidade;
    document.getElementById("tipoSala").value = sala.tipo;

    document.getElementById("idModalSalaTitulo").textContent = "Editar Sala";
    new bootstrap.Modal(document.getElementById("idModalSala")).show();
  }

  abrirModalExcluir(id) {
    this.idParaExcluir = id;
    new bootstrap.Modal(document.getElementById("modalExcluirSala")).show();
  }

  limparFormulario() {
    const form = document.getElementById("formSala");
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
}

document.addEventListener("DOMContentLoaded", () => {
  new SalaController();
});
