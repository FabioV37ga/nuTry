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

                // [Gerenciar] - abre a janela do dia selecionado
                $(".janela-inicio_adicionar")[0].addEventListener("click", () => {
                    if (Calendario.diaSelecionado)
                        Dia.abrir(Calendario.diaSelecionado)
                })

                // [dia] - click em qualquer dia do calendário
                for (let i = 0; i <= 41; i++) {
                    $(".dia")[i].addEventListener("click", function (event) {
                        Calendario.focar(event.target)
                    })
                }
                break;
        }
    }
}