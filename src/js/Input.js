class Input {
    static habilitar(janela) {
        switch (janela) {
            case "calendario":
                $(".a")[0].addEventListener("click", (() => {
                    Calendario.atualizar(Calendario.gerar("anterior"))
                }))
                $(".b")[0].addEventListener("click", (() => {
                    Calendario.atualizar(Calendario.gerar("proximo"))
                }))
                $(".janela-inicio_adicionar")[0].addEventListener("click", () => {
                    if (Calendario.diaSelecionado)
                        Dia.abrir()
                })
                for (let i = 0; i <= 41; i++) {
                    $(".dia")[i].addEventListener("click", function (event) {
                        Calendario.focar(event.target)
                    })
                }
                break;
        }
    }
}