class Calendario {
    static diaSelecionado;
    static data = new Date();
    static dia_mes = this.data.getDate();
    static dia_semana = this.data.getDay();
    static mes = this.data.getMonth();
    static mes_string;
    static ano = this.data.getFullYear();
    static pagina;

    static criar() {
        // Apenas cria as 34 casas de dias;
        var dia = `<a class="dia"></a>`
        for (let i = 0; i <= 41; i++) {
            $(".janela-inicio_calendario").append(dia)
        }
        console.log(`Hoje: ${this.dia_mes}/${this.mes + 1}/${this.ano}`)
    }

    static gerar(tipo) {
        switch (tipo) {
            case "atual":
                break;
            case "esquerda":
                if (this.mes > 0) {
                    this.mes--
                } else {
                    this.ano--
                    this.mes = 11
                }
                break;
            case "direita":
                if (this.mes < 11) {
                    this.mes++
                } else {
                    this.ano++
                    this.mes = 0
                }
                break;
        }
        this.data.setFullYear(this.ano)
        // Determina página baseada no mês atual
        this.pagina = this.mes;
        this.formatar()
    }

    static formatar() {
        // Define quantos dias tem no mês (28,29,30,31)
        function diasNoMes(mes, ano) {
            mes++
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

        // Cria nova data para determinar de qual casa a contagem de dias deve começar
        var formatarData = this.data
        // Define o mês baseado no mês decidido por this.gerar()
        formatarData.setMonth(this.mes)
        // Define o dia como 1
        formatarData.setDate(1)

        // Saída
        var posicaoSemanaDiaUm = formatarData.getDay();
        var diasTotaisMesAtual = diasNoMes(formatarData.getMonth(), formatarData.getFullYear()) + 1
        var diasTotaisMesPassado = diasNoMes(formatarData.getMonth() - 1, formatarData.getFullYear()) + 1
        // chama this.inserir() para atualizar visualmente o calendário
        this.inserir(posicaoSemanaDiaUm, diasTotaisMesAtual, diasTotaisMesPassado)
        this.ativar(posicaoSemanaDiaUm, diasTotaisMesAtual)
        // LOG
        console.log(`Mostrando: ${Inicio.formatar("mes")}/${this.ano}`)
        // return posicaoSemanaDiaUm, diasTotaisMesAtual;
    }

    static inserir(dia_semana_1, dias_totais_mes, dias_totais_mes_anterior) {
        // 1. Insere a quantidade total de dias desse mês, começando pela casa do dia 1[dia da semana]
        // 1. limpa o textcontent de todos os dias
        for (let i = 0; i <= 41; i++) {
            $(".dia")[i].textContent = ""
        }
        // Dia que vai ser impresso, incrementado a cada execução do loop
        var diaImpresso = 0
        // 2. troca o textContent dos elementos começando da casa correta com os dias corretos
        for (let i = dia_semana_1; i <= 41; i++) {
            diaImpresso < dias_totais_mes - 1 ? diaImpresso++ : diaImpresso = 1
            $(".dia")[i].textContent = diaImpresso
        }
        // 3. Pega os ultimos dias do ultimo mes e encaixa nas casas vazias
        if (this.dia_semana > 0) {
            for (let i = dia_semana_1 - 1; i >= 0; i--) {
                dias_totais_mes_anterior--
                $(".dia")[i].textContent = dias_totais_mes_anterior;
            }
        }
    }

    // Esse método adiciona elementos visuais quando o usuário interage com o caléndario.
    // (Dia selecionado, dia atual, dia com anotação)
    static ativar(posicaoSemanaDiaUm, diasTotaisMesAtual) {

        var dataAtual = new Date();
        var casa = document.querySelectorAll(".dia");

        // Marca o dia atual do mês atual de uma cor diferente:
        for (let i = posicaoSemanaDiaUm; i <= diasTotaisMesAtual + posicaoSemanaDiaUm; i++) {
            if (dataAtual.getMonth() == this.mes) {
                if (casa[i].textContent == this.dia_mes.toString()) {
                    casa[i].classList.add("presente")
                }
            } else {
                casa[i].classList.remove("presente")
            }
        }
        // Quando o usuário clica em um dia, sua estilização muda e reseta estilização dos demais;
        for (let i = 0; i <= 41; i++) {
            if (casa[i].getAttribute('listener') != 'true') {
                casa[i].addEventListener("click", function (event) {
                    focar(event.target)
                })
                casa[i].setAttribute('listener', 'true')
            }
        }
        // Tira classe foco do elemento anterior
        function focar(target) {
            for (let i = 0; i <= 41; i++) {
                casa[i].classList.contains("foco") ? casa[i].classList.remove("foco") : null;
            }
            // e adiciona apenas no dia certo
            target.classList.add("foco")
            // define o diaSelecionado
            Calendario.diaSelecionado = [`${target.textContent},${Calendario.mes + 1},${Calendario.ano}`]
        }
        // TODO | Verifica todas as casas atrás de dias que possuam informações cadastradas e adiciona estilização
        
    }
}