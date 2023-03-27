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

    static buscar() {
        // TODO | Busca no JSON se esse dia tem algum registro.
    }

    static inserir() {
        $(".janela-dia_titulo")[0].children[0].textContent = this.titulo;
        // TODO | Se o dia tiver registros, mostra eles na lista de itens (refeições)
    }

    static abrir() {
        this.formatar();
        // this.buscar();
        // TODO: this.buscar verifica se existem registros no dia e só então chama this.inserir
        this.inserir();

        // Mostra a janela do dia selecionado e desfoca o conteúdo atrás.
        $(".janela-dia")[0].style.display = 'initial'
        $(".outside")[0].style.display = "initial";
        $(".janela-inicio")[0].classList.add("blur")

        // Quando o usuário clica no símbolo de voltar, ou fora da janela do dia, fecha a janela.
        $(".outside")[0].addEventListener("click", this.fechar)
        $(".fechar-dia")[0].addEventListener("click", this.fechar)

    }

    static fechar() {
        // Esconde a janela aberta e tira o desfoque do resto do conteúdo
        $(".outside")[0].style.display = "none";
        $(".janela-dia")[0].style.display = 'none'
        $(".janela-inicio")[0].classList.remove("blur")
        // Remove listeners de click, já que serão adicionados novamente na próxima execução.
        $(".outside")[0].removeEventListener("click", close)
        $(".fechar-dia")[0].removeEventListener("click", close)
    }
}