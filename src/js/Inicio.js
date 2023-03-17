class Inicio {
    static iniciar() {
        Calendario.criar();
        Calendario.gerar("atual");

        $(".a")[0].addEventListener("click", (() => {
            Calendario.gerar("esquerda")
        }))
        $(".b")[0].addEventListener("click", (() => {
            Calendario.gerar("direita")
        }))

    }
}