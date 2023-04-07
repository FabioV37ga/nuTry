class Calendario {
    static data = new Date;
    static dataAtual;
    static dataDisplay;
    static dataSelecionada = null;

    static criar() {
        // Cria 42 elementos (um pra cada casa do calendário)
        var dia = `<a class="dia"></a>`
        for (let i = 0; i <= 41; i++) {
            $(".janela-inicio_calendario").append(dia)
        }
        // Armazena informações da data sendo mostrada em this.dataDisplay
        Calendario.dataDisplay = Calendario.gerar("atual");
    }

    static gerar(tipo) {
        switch (tipo) {
            // Anterior: Define o mês como "mês - 1"
            case "anterior":
                if (this.dataDisplay[1] > 0) {
                    this.dataDisplay[1]--
                    Calendario.data.setMonth(this.dataDisplay[1])
                } else {
                    this.dataDisplay[2]--
                    Calendario.data.setFullYear(this.dataDisplay[2])
                    this.dataDisplay[1] = 11
                    Calendario.data.setMonth(this.dataDisplay[1])
                }
                break;

            // Próximo: Define o mês como "mês + 1"
            case "proximo":
                if (this.dataDisplay[1] < 11) {
                    this.dataDisplay[1]++
                    Calendario.data.setMonth(this.dataDisplay[1])
                } else {
                    this.dataDisplay[2]++
                    Calendario.data.setFullYear(this.dataDisplay[2])
                    this.dataDisplay[1] = 0
                    Calendario.data.setMonth(this.dataDisplay[1])
                }
                break;
        }

        // Função nomeDoMes: Retorna o nome em string do mês em argumento
        function nomeDoMes(mes) {
            var meses = [
                "Janeiro", "Fevereiro", "Março", "Abril",
                "Maio", "Junho", "Julho", "Agosto",
                "Setembro", "Outubro", "Novembro", "Dezembro"]
            return meses[mes]
        }

        // Função posicaoDiaUm: Retorna a posição de 0 → 6 do dia '1' do mês definido anteriormente
        function posicaoDiaUm() {
            var diaUm = new Date
            diaUm.setFullYear(Calendario.data.getFullYear())
            diaUm.setMonth(Calendario.data.getMonth())
            diaUm.setDate(1)
            return diaUm.getDay()
        }

        // Função numeroDeDias: Retorna a quantidade de dias do mês em argumento (28,29,30 ou 31)
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

        /* Retorno final
                Retorna itens na seguinte ordem:
                        0. Dia
                        1. Mês
                        2. Ano
                        3. Nome do mês (string)
                        4. Posição do dia primeiro (0 → 6)
                        5. Quantidade de dias do mês atual
                        6. Quantidade de dias do mês anterior */
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
        // dia, mes, ano, nomeDoMes, pos1, maxDiasAtual, maxDiasAnterior
        console.log(
            `%c#Calendario #Atualizar\n Data:             %c${dia}/${mes + 1}/${ano}\n %cNome do mês:      %c${nomeDoMes}\n %cPosição inicial:  %c${pos1}\n %cTotais mês atual: %c${maxDiasAtual}\n %cTotais anterior:  %c${maxDiasAnterior}`, "color: lime", "color:white", "color: lime", "color:white", "color: lime", "color:white", "color: lime", "color:white", "color: lime", "color:white",)
        // Redefine texto e remove classes de todos os elementos (limpa)
        for (let i = 0; i <= 41; i++) {
            $(".dia")[i].textContent = ''
            $(".dia")[i].classList.remove("mesAtual")
            $(".dia")[i].classList.remove("mesAnterior")
            $(".dia")[i].classList.remove("mesProximo")
            $(".dia")[i].classList.remove("anotado")
        }

        // Imprime os dias do mês atual
        var diaImpresso = 0;
        for (let i = 0; i <= 41; i++) {
            // A partir da posição do dia 1 do mês selecionado [...]
            if (i >= pos1 && diaImpresso <= maxDiasAtual - 1) {
                diaImpresso++
                // Imprime os dias em ordem crescente até o número máximo de dias do mês selecionado.
                $(".dia")[i].textContent = diaImpresso
                // Marca casas como dias do mês atual
                $(".dia")[i].classList.add("mesAtual")
            }
        }
        // Imprime os números do mês anterior
        for (let i = 6; i >= 0; i--) {
            // Na primeira fileira (posições 0 → 6), se existirem casas sem texto [...]
            if ($(".dia")[i].textContent == '') {
                // Marca casas como dias do mês anterior
                $(".dia")[i].classList.add("mesAnterior")
                // Imprime os dias em ordem decresente a partir do número final do mês anterior
                $(".dia")[i].textContent = maxDiasAnterior
                maxDiasAnterior--
            }
        }
        // Imprime os números do mês seguinte
        diaImpresso = 0
        for (let i = 28; i <= 41; i++) {
            // Nas últimas duas fileiras, se existirem casas sem texto [...]
            if ($(".dia")[i].textContent == '') {
                diaImpresso++
                // Imprime os dias do mês seguinte em ordem crescente, começando do 1
                $(".dia")[i].textContent = diaImpresso
                // Marca casas como dias do mês seguinte
                $(".dia")[i].classList.add("mesProximo")
            }
        }

        // Adiciona estilização aos dias que constam registro
        for (let i = 0; i <= 41; i++) {
            if (
                Registro.buscar(
                    parseInt($(".dia")[i].textContent),
                    this.dataDisplay[1],
                    this.dataDisplay[2]) != null
            ) {
                console.log($(".dia")[i].textContent)
                $(".dia")[i].classList.add("anotado")
            }
        }

        // Troca título do calendário [NOME-DO-MES / ANO] → ex: "Março / 2023"
        $(".janela-inicio_mes")[0].children[1].textContent = `${nomeDoMes} / ${ano}`

        // Coloca cor azul 50% no dia atual do mês atual do ano atual
        if (Calendario.data.getMonth() == Calendario.dataAtual[1] &&
            Calendario.data.getFullYear() == Calendario.dataAtual[2]) {
            for (let i = 0; i <= 41; i++) {
                if ($(".dia")[i].textContent == Calendario.data.getDate() &&
                    $(".dia")[i].classList.contains("mesAtual")) {
                    $(".dia")[i].classList.add("presente")
                }
            }
        } else {
            for (let i = 0; i <= 41; i++) {
                $(".dia")[i].classList.remove("presente")
            }
        }
    }

    static selecionar(objeto) {

        // Remove o foco dos objetos sempre que um novo objeto é focado
        for (let i = 0; i <= 41; i++) {
            $(".dia")[i].classList.remove("foco")
        }
        objeto.classList.add("foco")


        var mesSelecionado = this.dataDisplay[1];
        // Se o foco ocorrer em dias do mês anterior [...]
        if (objeto.classList.contains("mesAnterior")) {
            // Ajusta o foco para selecionar o mês anterior
            mesSelecionado--
            // Limita navegação entre 0-11
            mesSelecionado == -1 ? mesSelecionado = 11 : null
        }
        // Se o foco ocorrer em dias do mês seguinte [...]
        else if (objeto.classList.contains("mesProximo")) {
            // Ajusta o foco para selecionar o mês seguinte
            mesSelecionado++
            // Limita navegação entre 0-11
            mesSelecionado == 12 ? mesSelecionado = 0 : null
        }
        // Define a data selecionada [dia,mes,ano]
        this.dataSelecionada = [parseInt(objeto.textContent), mesSelecionado, this.dataDisplay[2]]

        // Imprime data selecionada no console
        console.log(`%c#Calendário #Selecionar\n → %c${this.dataSelecionada[0]}/${this.dataSelecionada[1] + 1}/${this.dataSelecionada[2]}`, "color:#81deff", "color: white")
    }
}