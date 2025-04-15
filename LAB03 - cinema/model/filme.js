export class Filme {
    constructor(id, titulo, genero, classificacao, duracao, dataEstreia) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.dataEstreia = dataEstreia;
    }

    // Getters e Setters
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getGenero() {
        return this.genero;
    }

    setGenero(genero) {
        this.genero = genero;
    }

    getClassificacao() {
        return this.classificacao;
    }

    setClassificacao(classificacao) {
        this.classificacao = classificacao;
    }

    getDuracao() {
        return this.duracao;
    }

    setDuracao(duracao) {
        this.duracao = duracao;
    }

    getDataEstreia() {
        return this.dataEstreia;
    }

    setDataEstreia(dataEstreia) {
        this.dataEstreia = dataEstreia;
    }

    // Representação como string
    toString() {
        return `Filme { id: ${this.id}, título: "${this.titulo}", gênero: "${this.genero}", classificação: ${this.classificacao}, duração: "${this.duracao}", estreia: "${this.dataEstreia}" }`;
    }
}