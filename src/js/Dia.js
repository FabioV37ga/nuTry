class Dia extends Janela {
    static janela;
    constructor(janela, blur, fechar) {
        super()
        this.elementoJanela = janela;
        this.elementoFechar = fechar;
        this.elementoBlur = blur;
    }

    atualizar() {
        // Atualiza titulo da janela com a data atual
        var dia = Calendario.dataSelecionada[0];
        var mes = Calendario.dataSelecionada[1];
        var mesString = Calendario.gerar()[3];
        var ano = Calendario.dataSelecionada[2];
        $(".janela-dia_titulo")[0].children[0].textContent = `${dia} de ${mesString}, ${ano}`

        // Verifica se existem registros da data atual
        // se sim, insere eles na página
        Registro.verificar(dia, mes, ano);
    }
}