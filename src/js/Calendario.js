class Calendario {
    static data = new Date;
    static dataAtual;
    static dataDisplay;

    static criar() {
        // Apenas cria as 34 casas de dias;
        var dia = `<a class="dia"></a>`
        for (let i = 0; i <= 41; i++) {
            $(".janela-inicio_calendario").append(dia)
        }
        Calendario.dataDisplay = Calendario.gerar("atual");
    }

    static gerar(tipo) {
        console.log(Calendario.data.getDate() + "teste")
        switch (tipo) {
            case "atual":
                break;
            case "anterior":
                console.log("anterior")
                if (this.dataDisplay[1] > 0) {
                    this.dataDisplay[1]--
                    Calendario.data.setMonth(this.dataDisplay[1])
                } else {
                    this.dataDisplay[1] = 11
                    Calendario.data.setMonth(this.dataDisplay[1])
                    this.dataDisplay[2]--
                    Calendario.data.setFullYear(this.dataDisplay[2])
                }
                break;

            case "proximo":
                console.log("proximo")
                if (this.dataDisplay[1] < 11) {
                    this.dataDisplay[1]++
                    Calendario.data.setMonth(this.dataDisplay[1])
                } else {
                    this.dataDisplay[1] = 0
                    Calendario.data.setMonth(this.dataDisplay[1])
                    this.dataDisplay[2]++
                    Calendario.data.setFullYear(this.dataDisplay[2])
                }
                break;
        }

        function nomeDoMes(mes) {
            var meses = [
                "Janeiro", "Fevereiro", "Março", "Abril",
                "Maio", "Junho", "Julho", "Agosto",
                "Setembro", "Outubro", "Novembro", "Dezembro"]
            return meses[mes]
        }

        function posicaoDiaUm() {
            var diaUm = new Date
            diaUm.setMonth(Calendario.data.getMonth())
            diaUm.setDate(1)
            return diaUm.getDay()
        }

        function numeroDeDias(tipo, mes, ano) {
            switch (tipo) {
                case "atual":
                    break;
                case "anterior":
                    mes > 1 ? mes-- : mes = 12;
                    break;
            }
            if (mes === 2) { // Fevereiro
                // Verifica se o ano é bissexto ou não
                if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
                    return 29;
                } else {
                    return 28;
                }
            } else if (mes === 4 || mes === 6 || mes === 9 || mes === 11) { // Abril, Junho, Setembro, Novembro
                return 30;
            } else { // Janeiro, Março, Maio, Julho, Agosto, Outubro, Dezembro
                return 31;
            }
        }
        return [
            Calendario.data.getDate(),
            Calendario.data.getMonth(),
            Calendario.data.getFullYear(),
            nomeDoMes(Calendario.data.getMonth()),
            posicaoDiaUm(),
            numeroDeDias("atual", Calendario.data.getMonth() + 1, Calendario.data.getFullYear()),
            numeroDeDias("anterior", Calendario.data.getMonth() + 1, Calendario.data.getFullYear())
        ]
    }

    static atualizar(args) {
        var dia = args[0]
        var mes = args[1]
        var ano = args[2]
        var nomeDoMes = args[3]
        var pos1 = args[4]
        var maxDiasAtual = args[5]
        var maxDiasAnterior = args[6]

        console.log(dia, mes, ano, nomeDoMes, pos1, maxDiasAtual, maxDiasAnterior)
        // Reseta o texto de todos os dias
        for (let i = 0; i <= 41; i++) {
            $(".dia")[i].textContent = ''
            $(".dia")[i].classList.remove("mesAtual")
            $(".dia")[i].classList.remove("mesAnterior")
            $(".dia")[i].classList.remove("mesProximo")
        }
        var diaImpresso = 0;
        // Imprime os dias do mês atual
        for (let i = 0; i <= 41; i++) {
            if (i >= pos1 && diaImpresso <= maxDiasAtual - 1) {
                diaImpresso++
                $(".dia")[i].textContent = diaImpresso
                $(".dia")[i].classList.add("mesAtual")
            }
        }
        for (let i = 6; i >= 0; i--) {
            if ($(".dia")[i].textContent == '') {
                $(".dia")[i].classList.add("mesAnterior")
                $(".dia")[i].textContent = maxDiasAnterior
                maxDiasAnterior--
            }
        }
        diaImpresso = 0
        for (let i = 28; i <= 41; i++) {
            if ($(".dia")[i].textContent == '') {
                diaImpresso++
                $(".dia")[i].textContent = diaImpresso
                $(".dia")[i].classList.add("mesProximo")
            }
        }

        $(".janela-inicio_mes")[0].children[1].textContent = `${nomeDoMes} / ${ano}`
        // console.log(Calendario.dataAtual)
        if (Calendario.data.getMonth() == Calendario.dataAtual[1] &&
            Calendario.data.getFullYear() == Calendario.dataAtual[2]) {
            for (let i = 0; i <= 41; i++) {
                if ($(".dia")[i].textContent == Calendario.data.getDate() && $(".dia")[i].classList.contains("mesAtual")) {
                    $(".dia")[i].classList.add("presente")
                }
            }
        }
    }
}