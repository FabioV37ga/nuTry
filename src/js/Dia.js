class Dia {
    static visivel = 0;
    static dia;
    static titulo;
    static itens;


    static formatar() {
        this.dia = Calendario.diaSelecionado;
        var dia = this.dia.toString().split(",")[0];
        parseInt(dia) < 10 ? dia = '0' + dia : dia;
        var mes = Inicio.formatar("single", this.dia.toString().split(",")[1])
        var ano = this.dia.toString().split(",")[2];

        this.titulo = `${dia} de ${mes}, ${ano}`
    }

    static buscar(){
        // TODO | Busca no JSON se esse dia tem algum registro.
    }

    static inserir() {
        $(".janela-dia_titulo")[0].children[0].textContent = this.titulo;
        // TODO | Se o dia tiver registros, mostra eles na lista de itens (refeições)
    }

    static abrir() {
        this.formatar();
        this.inserir();

        $(".janela-dia")[0].style.display = 'initial'
        $(".janela-inicio")[0].classList.add("blur")
    }
}