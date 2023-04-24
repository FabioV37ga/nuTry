class Refeicao extends Janela {
    static janela;
    constructor(janela, blur, fechar) {
        super()
        this.elementoJanela = janela;
        this.elementoFechar = fechar;
        this.elementoBlur = blur;
    }

    verificar() {
        var refeicao;
        if (Consumo.refeicaoSelecionada == 'new') {
            if (Consumo.anotacao.objeto.refeicoes.length - 1 > 0) {
                refeicao = Consumo.anotacao.objeto.refeicoes.length - 1
            } else {
                refeicao = 0
            }
        } else {
            refeicao = Consumo.refeicaoSelecionada
        }

        if (
            Object.keys(Consumo.anotacao.objeto.refeicoes[refeicao])
                .length != 3) {
            return 0
        } else {
            return 1
        }
    }

    atualizar() {

    }

    prompt() {
        console.log("pergunta!!!")
    }
}