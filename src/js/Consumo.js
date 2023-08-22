class Consumo extends Registro {
    static anotacao;
    static refeicaoSelecionada = "new";
    static pratoSelecionado = "new";
    objeto;
    dados;
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
                            this.formatar("refeicao", i + 1)
                        }
                        // console.log(this.objeto)
                        // console.log(this.objeto.refeicoes)
                    }
                }
                break
            // [id,tipo,pratos]

            case "refeicao":
                var stringTipo;
                var numero;
                if (Consumo.refeicaoSelecionada == 'new') {
                    if (this.objeto.refeicoes.length - 1 > 0) {
                        numero = this.objeto.refeicoes.length - 1
                    } else {
                        numero = 0
                    }
                } else {
                    numero = Consumo.refeicaoSelecionada
                }
                // console.log(args)
                switch (args) {
                    case 0:
                        stringTipo = "cafe"
                        this.objeto.refeicoes[numero].tipo = stringTipo
                        break
                    case 1:
                        stringTipo = "almoço"
                        this.objeto.refeicoes[numero].tipo = stringTipo
                        break
                    case 2:
                        stringTipo = "tarde"
                        this.objeto.refeicoes[numero].tipo = stringTipo
                        break
                    case 3:
                        stringTipo = "jantar"
                        this.objeto.refeicoes[numero].tipo = stringTipo
                        break
                    case 4:
                        stringTipo = "outro"
                        this.objeto.refeicoes[numero].tipo = stringTipo
                        break
                }
              break
              case "prato":
                // todo
                break
        }
    }

    criar(sessao) {
        switch (sessao) {
            case "refeicao":
                console.log(Consumo.refeicaoSelecionada)
                if (Consumo.refeicaoSelecionada == 'new') {
                    if (this.objeto.refeicoes) {
                        console.log(this.objeto)
                        this.objeto.refeicoes[this.objeto.refeicoes.length] = new Object()
                    } else {
                        this.objeto.refeicoes = [new Object()]
                        console.log(this.objeto)
                    }
                }

                this.objeto.refeicoes[this.objeto.refeicoes.length - 1].id =
                    this.objeto.refeicoes.length
                break
            case "prato":
                if (this.objeto.refeicoes[this.objeto.refeicoes.length - 1].pratos) {

                } else {
                    this.objeto.refeicoes[this.objeto.refeicoes.length - 1].pratos = [new Object()]
                }
                break
        }

    }

    apagar(sessao) {

        var refeicao;
        if (Consumo.refeicaoSelecionada == 'new') {
            if (this.objeto.refeicoes != null &&
                this.objeto.refeicoes.length - 1 > 0) {
                refeicao = this.objeto.refeicoes.length - 1
            } else {
                refeicao = 0
            }
        } else {
            refeicao = Consumo.refeicaoSelecionada
        }

        var prato;
        if (Consumo.pratoSelecionado == 'new') {
            if (this.objeto.refeicao != null &&
                this.objeto.refeicoes[refeicao].length - 1 > 0) {
                prato = this.objeto.refeicoes[refeicao].length - 1
            } else {
                prato = 0
            }
        } else {
            prato = Consumo.refeicaoSelecionada
        }

        switch (sessao) {

            case "dia":
                if (Consumo.refeicaoSelecionada == 'new') {

                }
                // if (Object.keys(this.objeto.refeicoes[Consumo.pratoSelecionado]).length != 3) {
                //     delete this.objeto.refeicoes[Consumo.pratoSelecionado]
                // }
                break

            case "refeicao":
                delete this.objeto.refeicoes[refeicao]
                if (Object.keys(this.objeto.refeicoes).length == 0) {
                    delete this.objeto.refeicoes
                }
                break;

            case "prato":
                delete this.objeto.refeicoes[refeicao].pratos[prato]
                if (this.objeto.refeicoes[refeicao].pratos.length - 1 == 0) {
                    delete this.objeto.refeicoes[refeicao].pratos
                }
                break
        }

        this.objeto = JSON.parse(
            JSON.stringify(this.objeto)
                .replaceAll(",null,", ",")
                .replaceAll("null,", "")
                .replaceAll(",null", "")
                .replaceAll("null", "")
        )
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
                // Executa para cada refeição do objeto:

                // Verifica se existem refeições no dia selecionado.
                if (this.objeto.refeicoes) {

                    // Descarta itens vazios.
                    // console.log(Object.keys(this.objeto.refeicoes[i]).length)
                    // registro.refeicoes != null ? console.log(registro.refeicoes) : null
                    // Verifica diferença entre o objeto volatil 'this.objeto.refeicoes' e item no registro
                    for (let i = 0; i <= this.objeto.refeicoes.length - 1; i++) {
                        if (registro != false) {
                            if (JSON.stringify(this.objeto.refeicoes[i]) !=
                                JSON.stringify(registro.refeicoes[i])
                            ) {
                                // Se houver diferença, retorna true
                                console.log("Itens alterados, salvar.")
                                return true
                            } else {
                                if (i == this.objeto.refeicoes.length - 1 &&
                                    JSON.stringify(this.objeto.refeicoes[i]) ==
                                    JSON.stringify(registro.refeicoes[i])) {
                                    console.log("inalterado")
                                    return false
                                }
                            }
                        } else {
                            if (Object.keys(this.objeto).length == 4) {
                                return true
                            }
                        }
                    }
                } else {
                    console.log("sem refeicoes")
                    return false
                }

                break
            case "registrar":
                // // Get no objeto registrado correspondende ao objeto 'this.objeto', se existir.
                var registro = Registro.retornar("consumo", this.objeto)

                if (Registro.retornar("consumo", this.objeto) == false) {
                    console.log("teste1")
                    this.registrar(this.objeto)
                } else {
                    this.editar(this.objeto)
                }

                break;
        }
    }
}