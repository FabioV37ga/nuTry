class Inicio {
    static iniciar() {
        Inicio.formatar("load")
        Calendario.criar();
        Calendario.gerar("atual");
        $(".janela-inicio_mes")[0].children[1].textContent = this.formatar("mes")

        $(".a")[0].addEventListener("click", (() => {
            Calendario.gerar("esquerda")
            $(".janela-inicio_mes")[0].children[1].textContent = this.formatar("mes")
        }))
        $(".b")[0].addEventListener("click", (() => {
            Calendario.gerar("direita")
            $(".janela-inicio_mes")[0].children[1].textContent = this.formatar("mes")
        }))
    }

    static formatar(tipo) {
        var meses = [
            "Janeiro", "Fevereiro", "Março", "Abril",
            "Maio", "Junho", "Julho", "Agosto",
            "Setembro", "Outubro", "Novembro", "Dezembro"]
        switch (tipo) {
            case "load":
                return meses[Calendario.mes - 1]
            case "mes":
                return meses[Calendario.mes]

        }
    }
}