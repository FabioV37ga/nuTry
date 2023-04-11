class Prato extends Janela{
    static janela;
    constructor(janela, blur, fechar) {
        super()
        this.elementoJanela = janela;
        this.elementoFechar = fechar;
        this.elementoBlur = blur;
    }
}