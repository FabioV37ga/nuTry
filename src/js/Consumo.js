class Consumo extends Registro {
    static anotacao;
    objeto;
    dados;
    dadosArray
    constructor(dados) {
        super()
        this.branch = "consumo"
        this.dados = dados;
        this.inicializar();
        this.formatar("dia");
    }

    formatar(sessao) {
        this.objeto = this.objeto == null ? new Object() : this.objeto;
        // this.objeto = new Object()


        switch (sessao) {
            // [dia,mes,ano,refeicoes]
            case "dia":
                // GET qtd de refeicoes no dia selecionado
                this.objeto.dia = this.dados[0]
                this.objeto.mes = this.dados[1]
                this.objeto.ano = this.dados[2]
                var objetoRegistro = Registro.retornar("consumo", this.objeto)

                if ((objetoRegistro)) {
                    if ('refeicoes' in (objetoRegistro)) {
                        var refeicoes = new Object()
                        for (let i = 0; i <= objetoRegistro.refeicoes.length - 1; i++) {
                            refeicoes[i] = objetoRegistro.refeicoes[i]
                            this.criar("dia", refeicoes[i])
                        }
                        this.objeto.refeicoes = refeicoes
                    }
                } else {
                    this.objeto.refeicoes = new Object()
                }
                break
            // [id,tipo,pratos]
            case "refeicao":
                // console.log(this.objeto)
                break
        }
    }

    criar(sessao, dados) {
        switch (sessao) {
            case "dia":
                console.log(dados.pratos)
                var dadosFormatados = "";
                for (let i = 0; i <= dados.pratos.length - 1; i++) {
                    if (dadosFormatados == ""){
                        dadosFormatados = `${dados.pratos[i].nome} `
                    }else{
                        dadosFormatados += `. ${dados.pratos[i].nome}`
                    }
                }

                var elemento =
                    `
                <div class="item">
                    <a href="#">
                        <span>
                            <img src="src/img/edita.png" class="editar-refeicao">
                        </span>
                    </a>
                    <p>
                        ${dados.tipo} . ${dadosFormatados}
                    </p>
                </div>
                `
                $(elemento).appendTo(".janela-dia")
                break
        }
    }

    apagar(sessao) {
        switch (sessao) {
            case "dia":
                var item = $(".janela-dia .item")
                // console.log(item)
                for (let i = 0; i <= item.length - 1; i++) {
                    if (item[i].classList.contains("adicionar-refeicao") == false &&
                        item[i].children[0].classList.contains("adicionar-refeicao") == false) {
                        item[i].remove()
                    }
                }
                break
        }
    }
}