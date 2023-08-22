class Input {
    static habilitar(janela) {
        switch (janela) {

            case "calendario":
                // [<] - navegar no sentido volta no calendário
                $(".a")[0].addEventListener("click", (() => {
                    Calendario.atualizar(Calendario.gerar("anterior"))
                    for (let i = 0; i <= 41; i++) {
                        $(".dia")[i].classList.remove("foco")
                    }
                    Calendario.dataSelecionada = null
                }))

                // [>] - navegar no sentido ida no calendário
                $(".b")[0].addEventListener("click", (() => {
                    Calendario.atualizar(Calendario.gerar("proximo"))
                    for (let i = 0; i <= 41; i++) {
                        $(".dia")[i].classList.remove("foco")
                    }
                    Calendario.dataSelecionada = null
                }))

                // [dia] - selecionar um dia
                for (let i = 0; i <= 41; i++) {
                    $(".dia")[i].addEventListener("click", function (event) {
                        Calendario.selecionar(event.target)
                    })
                }

                // [Gerenciar] - abrir janela de gerenciamento de um dia
                $(".janela-inicio_adicionar")[0].addEventListener("click", () => {
                    if (Calendario.dataSelecionada) {
                        Dia.janela = new Dia($(".janela-dia")[0], $(".janela-inicio")[0], "13")
                        Dia.janela.abrir()
                        Dia.janela.atualizar("abrir")
                        Consumo.anotacao =
                            new Consumo([
                                Calendario.dataSelecionada[0],
                                Calendario.dataSelecionada[1],
                                Calendario.dataSelecionada[2],
                            ])
                        Consumo.refeicaoSelecionada = "new"
                        Input.habilitar("dia")

                    }
                    // Registro.gerar("iniciar")
                })
                break;


            case "dia":
                // [x] - fechar
                if (this.verificar($(".fechar-dia")[0]) == 0) {
                    $(".fechar-dia")[0].addEventListener("click", () => {
                        if (Consumo.anotacao.salvar("verificar") == true) {
                            Dia.janela.prompt("dia")
                            // Consumo.anotacao.salvar("registrar")
                        } else {
                            Dia.janela.fechar()
                            Dia.apagar()
                        }
                        // Consumo.anotacao.apagar("dia")
                    })
                }

                // [v] - salvar & fechar
                if (this.verificar($(".salvar-dia")[0]) == 0) {
                    $(".salvar-dia")[0].addEventListener("click", () => {
                        if (Consumo.anotacao.salvar("verificar") == true) {

                            Consumo.anotacao.salvar("registrar")
                        }
                        Dia.apagar()
                        Dia.janela.fechar()
                        Consumo.anotacao.apagar("dia")
                        // Registro.gerar("dia")
                        // Registro.registrar("dia")

                    })
                }

                // [+] - adicionar refeição
                if (this.verificar($(".adicionar-refeicao")[0].children[0]) == 0) {
                    $(".adicionar-refeicao")[0].children[0].addEventListener("click", () => {
                        Consumo.refeicaoSelecionada = "new"
                        Refeicao.janela = new Refeicao($(".janela-refeicao")[0], $(".janela-dia")[0], "13")
                        Refeicao.janela.abrir();
                        Consumo.anotacao.criar("refeicao")
                        // Consumo.anotacao.formatar("refeicao")
                    })
                }

                for (let i = 0; i <= $(".editar-refeicao").length - 1; i++) {
                    if (this.verificar($(".editar-refeicao")[i].parentElement.parentElement) == 0) {
                        $(".editar-refeicao")[i].addEventListener("click", () => {
                            Consumo.refeicaoSelecionada = i;
                            console.log("aa! " + Consumo.refeicaoSelecionada)
                            Refeicao.janela = new Refeicao($(".janela-refeicao")[0], $(".janela-dia")[0], "13")
                            Refeicao.janela.abrir();
                            Consumo.anotacao.criar("refeicao")
                        })
                    }
                }
                break;


            case "refeicao":
                // [v] - salvar & fechar
                if (this.verificar($(".salvar-refeicao")[0]) == 0) {
                    $(".salvar-refeicao")[0].addEventListener("click", () => {
                        if (Refeicao.janela.verificar() == 1) {

                        } else {
                            Consumo.anotacao.apagar("refeicao")
                        }
                        Refeicao.janela.fechar()
                    })
                }
                // [X] - fechar
                if (this.verificar($(".fechar-refeicao")[0]) == 0) {
                    $(".fechar-refeicao")[0].addEventListener("click", () => {

                        if (Refeicao.janela.verificar() == 1) {
                            Refeicao.janela.prompt("refeicao")
                        } else {
                            Consumo.anotacao.apagar("refeicao")
                            Refeicao.janela.fechar()
                        }

                    })
                }

                // [Selecionar] - alterna visibilidade da lista de tipos de refeição
                if (this.verificar($(".selecionar-refeicao-tipo")[0]) == 0) {
                    $(".selecionar-refeicao-tipo")[0].addEventListener("click", () => {
                        if ($(".tipos")[0].style.display == "none" || $(".tipos")[0].style.display == '') {
                            $(".tipos")[0].style.display = "flex"
                        } else {
                            $(".tipos")[0].style.display = "none"
                        }
                    })
                }

                // [ITEM] - Seleciona o item no backend, troca informações na tela
                for (let i = 0; i <= $(".tipos-item").length - 1; i++) {
                    if (this.verificar($(".tipos-item")[i]) == 0) {
                        $(".tipos-item")[i].addEventListener("click", () => {
                            $(".tipos")[0].style.display = "none"
                            // console.log(i)
                            Consumo.anotacao.formatar("refeicao", (i))
                        })
                    }
                }

                // [+] - Adicionar prato, abre a janela prato.
                if (this.verificar($(".adicionar-prato")[0]) == 0) {
                    $(".adicionar-prato")[0].addEventListener("click", () => {
                        Prato.janela = new Prato($(".janela-prato")[0], $(".janela-refeicao")[0], "13");
                        Prato.janela.abrir();
                        Referencia.atualizar("lista", "registrar")
                        Consumo.pratoSelecionado = "new"
                        Consumo.anotacao.criar("prato")
                        this.habilitar("referencia")
                    })
                }

                // if (this.verificar($(".fechar-refeicao")[0]) == 0) {
                break;

            case "prato":
                // [selecionar] - expande/contrai lista de pratos 
                $(".prato-selecionado")[0].addEventListener("click", () => {
                    if ($(".lista-pratos")[0].style.display == "none" ||
                        $(".lista-pratos")[0].style.display == '') {
                        $(".lista-pratos")[0].style.display = "initial"
                    } else {
                        $(".lista-pratos")[0].style.display = "none"
                    }
                })

                // [x] - Fechar janela prato
                $(".fecha-prato")[0].addEventListener("click", () => {
                    if (Prato.janela.verificar() == 1) {
                        Prato.janela.prompt("prato")
                    } else {
                        Consumo.anotacao.apagar("prato")
                    }
                    // Prato.atualizar("limpar")
                    // Prato.janela.fechar()
                })

                // [v] - Salver e Fechar janela prato
                $(".salva-prato")[0].addEventListener("click", () => {
                    if (Prato.janela.verificar() == 1) {
                        console.log("salva")
                    } else {

                    }
                    Prato.janela.salvar()
                    Prato.atualizar("limpar")
                    Prato.janela.fechar()
                })

                break
            case "referencia":

                // [v] - salvar prato de referência
                if (this.verificar($(".salvar-prato")[0]) == 0) {
                    $(".salvar-prato")[0].addEventListener("click", () => {
                        Referencia.anotacao = new Referencia(Prato.janela.retornarInputs("referencia"))
                        Referencia.anotacao.verificar()
                        Referencia.atualizar("lista", "registrar")
                    })
                }

                if (this.verificar($(".lista-pratos-novo")[0].children[0]) == 0) {
                    $(".lista-pratos-novo")[0].children[0].addEventListener("click", () => {
                        $(".lista-pratos")[0].style.display = "none"
                        Prato.atualizar("referencia", "itens", null)
                        Prato.atualizar("referencia", "titulo", "apagar")
                    })
                }


                // [ITENS (PRATOS DE REFERÊNCIA)] - clicar nos pratos os seleciona & altera o visualmente 
                for (let i = 0; i <= $(".lista-pratos-item").length - 1; i++) {
                    if (this.verificar($(".lista-pratos-item")[i]) == 0) {
                        $(".lista-pratos-item")[i].addEventListener("click", function (event) {
                            $(".lista-pratos")[0].style.display = "none"
                            Prato.atualizar("referencia", "itens", event.target)
                            Prato.atualizar("consumo")
                        })
                    }
                }

                // Apagar prato do registro
                if (this.verificar($(".apagar-prato-referencia")[0]) == 0) {
                    $(".apagar-prato-referencia")[0].addEventListener("click", () => {
                        // Prato.prompt("apagar")
                        Registro.apagar("referencia", $(".prato-selecionado")[0].children[0].textContent.trim())
                    })
                }

                break
            case "consumo":
                for (let i = 0; i <= $(".checkbox").length - 1; i++) {
                    $(".checkbox")[i].addEventListener("click", function (event) {
                        for (let i = 0; i <= $(".checkbox").length - 1; i++) {
                            $(".checkbox")[i].classList.remove("checked")
                            $(".checkbox")[i].parentElement.children[0].setAttribute("disabled", '')
                        }
                        console.log(event.target)
                        if (event.target.classList.contains("checked")) {
                            $(".checkbox")[i].parentElement.children[0].setAttribute("disabled", '')
                            event.target.classList.remove("checked")
                        } else {
                            $(".checkbox")[i].parentElement.children[0].removeAttribute("disabled",)
                            event.target.classList.add("checked")
                        }
                    })
                }
                break


        }
    }

    static verificar(elemento) {
        if (
            elemento.getAttribute("funcao") == undefined ||
            elemento.getAttribute("funcao") != 'true') {
            elemento.setAttribute("funcao", 'true')
            return 0;
        } else {
            return 1
        }
    }
}