class Calendario {
    static data;
    static dia_numerico;
    static dia_semana_numerico;
    static dia_nome;
    static mes_numerico;
    static mes_nome;
    static ano;

    static verificarData() {
        Calendario.data = new Date();
        Calendario.data.getTimezoneOffset();
        Calendario.dia_numerico = Calendario.data.getDate();
        Calendario.dia_semana_numerico = Calendario.data.getDay();
        Calendario.mes_numerico = Calendario.data.getMonth();
        Calendario.ano = Calendario.data.getFullYear();
        Calendario.formatarData()

    }

    static formatarData() {
        Calendario.dia_semana_numerico++;
        if (Calendario.dia_numerico < 10) {
            Calendario.dia_numerico = 0 + "" + Calendario.dia_numerico;
        }
        Calendario.mes_numerico++
        if (Calendario.mes_numerico < 10) {
            Calendario.mes_numerico = 0 + "" + Calendario.mes_numerico;
        }
        console.log(`Hoje: ${Calendario.dia_numerico}/${Calendario.mes_numerico}/${Calendario.ano}`);
    }

    static formatarCalendario(e) {
        // Cria grid de dias
        if (e == 0) {
            for (let i = 0; i <= 34; i++) {
                var dia = `<a class="dia"></a>`
                $(".janela-inicio_calendario").append(dia)
                document.querySelectorAll(".dia")[i].addEventListener("click", function (event) {
                    gerenciaClick(event.target)
                });
            }
        }

        function getDaysInMonth(month, year) {
            if (month === 2) { // Fevereiro
                // Verifica se o ano é bissexto ou não
                if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                    return 29;
                } else {
                    return 28;
                }
            } else if (month === 4 || month === 6 || month === 9 || month === 11) { // Abril, Junho, Setembro, Novembro
                return 30;
            } else { // Janeiro, Março, Maio, Julho, Agosto, Outubro, Dezembro
                return 31;
            }
        }
        // Define, a partir do dia da semana do primeiro dia desse mês, onde os elementos
        // devem ser criados na tabela

        var dia_um = new Date()
        dia_um.setDate(1)
        dia_um = dia_um.getDay() + 1
        var diaCalendario = 0;

        for (let i = dia_um - 1; i <= getDaysInMonth(Calendario.mes_numerico, Calendario.ano) + 2; i++) {
            diaCalendario++
            document.querySelectorAll(".dia")[i].textContent = diaCalendario
            if (document.querySelectorAll(".dia")[i].textContent == Calendario.dia_numerico.toString()) {
                document.querySelectorAll(".dia")[i].style = "background: #00a5ff21;"
                document.querySelectorAll(".dia")[i].classList.add("foco")
            }
        }

        function gerenciaClick(e) {
            for (let i = 0; i <= 34; i++) {
                if (document.querySelectorAll(".dia")[i].classList.contains("foco")) {
                    document.querySelectorAll(".dia")[i].classList.remove("foco");
                    e.classList.add("foco")
                    break
                }
            }
        }

        var a;
        var b;
    }
}