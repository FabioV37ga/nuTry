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
                break;
        }

        
    }
}