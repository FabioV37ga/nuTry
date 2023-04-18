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

    formatar(sessao, args) {
        this.objeto = this.objeto == null ? new Object() : this.objeto;
        // console.log(this.objeto)
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
                        var refeicoes = [new Object()]
                        for (let i = 0; i <= objetoRegistro.refeicoes.length - 1; i++) {
                            refeicoes[i] = objetoRegistro.refeicoes[i]
                            this.objeto.refeicoes = refeicoes
                            Dia.criar("dia", refeicoes[i])
                            this.formatar("refeicao", i)
                        }
                        // console.log(this.objeto)
                        // console.log(this.objeto.refeicoes)
                    }
                }
                break
            // [id,tipo,pratos]

            case "refeicao":
                // console.log(Object.keys(this.objeto.refeicoes).length)
                if (Object.keys(this.objeto.refeicoes).length > 0) {
                    console.log(`%c#Consumo #Formatar\n %cRefeição [${args}]: %c${JSON.stringify(this.objeto.refeicoes[args].tipo)}`, "color: #65d7ff", "color: #93c0cf", "color: white")
                    for (let i = 0; i <= this.objeto.refeicoes[args].pratos.length - 1; i++) {
                        if (Object.keys(this.objeto.refeicoes[args].pratos[i]).length > 0) {
                            console.log(` %cRefeição [${args}] Prato [${i}]: ` + `%c"${this.objeto.refeicoes[args].pratos[i].nome}"`, "color: #93c0cf", "color: white")
                        }
                    }
                }
                break
        }
    }

    criar(sessao) {
        switch (sessao) {
            case "refeicao":
                if (this.objeto.refeicoes) {
                    console.log(this.objeto)
                    this.objeto.refeicoes[this.objeto.refeicoes.length] = new Object()
                } else {
                    this.objeto.refeicoes = [new Object()]
                    console.log(this.objeto)
                }
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

    salvar(etapa) {
        switch (etapa) {
            case "verificar":
                /* 
                Verifica se os valores do 'this.objeto.refeicoes' (anotação volátil do dia aberto) são 
                diferentes dos que constam no registro, determinando se existe a necessidade de salvamento.
                */

                // Get no objeto registrado correspondende ao objeto 'this.objeto', se existir.
                var registro = Registro.retornar("consumo", this.objeto)
                // Quantidade de chaves, no caso, refeicoes, que o 'this.objeto' possui.
                var chaves = this.objeto.refeicoes ? Object.keys(this.objeto.refeicoes) : null
                // Verifica se existem objetos a serem salvos através da quantidade de chaves.
                if (chaves != null && chaves.length > 1) {
                    // Executa para cada refeição do objeto:
                    for (let i = 0; i <= chaves.length - 1; i++) {
                        // Verifica se existem refeições no dia selecionado.
                        if (this.objeto.refeicoes) {
                            // Descarta itens vazios.
                            if (Object.keys(this.objeto.refeicoes[i]).length != 3) {
                                delete this.objeto.refeicoes[i]
                                console.log(this.objeto.refeicoes)
                                this.objeto = JSON.parse(
                                    JSON.stringify(this.objeto)
                                        .replaceAll(",null,", ",")
                                        .replaceAll("null,", "")
                                        .replaceAll(",null", "")
                                        .replaceAll("null", "")
                                )
                                console.log(this.objeto.refeicoes)
                            }
                            // Verifica diferença entre o objeto volatil 'this.objeto.refeicoes' e item no registro
                            if (JSON.stringify(this.objeto.refeicoes[i]) !=
                                JSON.stringify(registro.refeicoes[i])
                            ) {
                                // Se houver diferença, retorna true
                                console.log("Itens alterados, salvar.")
                                return true
                            } else {
                                if (i == chaves.length - 1) {
                                    // Se não houver diferença, e o loop terminar, retorna false
                                    console.log("Itens inalterados, não salvar.")
                                    return false
                                }
                            }
                        }
                    }
                } else {
                    // Desconsidera salvamento se não houverem itens no dia selecionado
                    console.log("Itens inexistentes.")
                    return false
                }
                break
        }
    }
}