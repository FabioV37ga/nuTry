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
                    Dia.janela = new Dia($(".janela-dia")[0], $(".janela-inicio")[0], "13")
                    Dia.janela.abrir()
                    Dia.janela.atualizar("abrir")
                    // Registro.gerar("iniciar")
                })
                break;


            case "dia":
                // [x] - fechar
                $(".fechar-dia")[0].addEventListener("click", () => {
                    Dia.janela.fechar()
                })

                // [v] - salvar & fechar
                $(".salvar-dia")[0].addEventListener("click", () => {
                    Dia.janela.fechar()
                    // Registro.gerar("dia")
                    // Registro.registrar("dia")

                })

                // [+] - adicionar refeição
                $(".adicionar-refeicao")[0].children[0].addEventListener("click", () => {
                    Refeicao.janela = new Refeicao($(".janela-refeicao")[0], $(".janela-dia")[0], "13")
                    Refeicao.janela.abrir()
                })
                break;


            case "refeicao":
                // [v] - salvar & fechar
                $(".salvar-refeicao")[0].addEventListener("click", () => {
                    Refeicao.janela.fechar()
                })

                // [X] - salvar & fechar
                $(".fechar-refeicao")[0].addEventListener("click", () => {
                    Refeicao.janela.fechar()
                })

                // [Selecionar] - alterna visibilidade da lista de tipos de refeição
                $(".selecionar-refeicao-tipo")[0].addEventListener("click", () => {
                    if ($(".tipos")[0].style.display == "none" || $(".tipos")[0].style.display == '') {
                        $(".tipos")[0].style.display = "flex"
                    } else {
                        $(".tipos")[0].style.display = "none"
                    }
                })

                // [ITEM] - Seleciona o item no backend, troca informações na tela
                for (let i = 0; i <= $(".tipos-item").length - 1; i++) {
                    $(".tipos-item")[i].addEventListener("click", () => {
                        $(".tipos")[0].style.display = "none"
                        $(".selecionar-refeicao-tipo")[0].children[1].textContent = `${$(".tipos-item")[i].children[0].textContent}`
                    })
                }
                break;

            case "prato":
                $(".adicionar-prato")[0].addEventListener("click", () => {
                    Prato.janela = new Prato($(".janela-prato")[0],$(".janela-refeicao")[0], "13");
                    Prato.janela.abrir();
                })
                break
        }
    }
}