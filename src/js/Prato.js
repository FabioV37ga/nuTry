class Prato extends Janela {
    static janela;
    constructor(janela, blur, fechar) {
        super()
        this.elementoJanela = janela;
        this.elementoFechar = fechar;
        this.elementoBlur = blur;
    }

    retornarInputs(tipo) {
        var dados = [/*nome,peso,calorias,proteinas,carboidratos,gorduras*/]

        switch (tipo) {
            case "referencia":
                var itens = $(".referencia .informacoes-prato-item");
                for (let i = 0; i <= itens.length - 1; i++) {
                    dados[i] = itens[i].children[1].value
                }
                return dados;
                
            case "consumo":
                return 1
        }
    }
}