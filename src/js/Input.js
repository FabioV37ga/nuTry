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
                    Registro.gerar("iniciar")
                })
                break;


            case "dia":
                // [v] - salvar & fechar
                $(".fechar-dia")[0].addEventListener("click", () => {
                    Dia.janela.fechar();
                    Dia.janela.atualizar("fechar")
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
                break;
        }
    }
}