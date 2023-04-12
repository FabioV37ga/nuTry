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
                    dados[i] = itens[i].children[1].value;
                }
                return dados;

            case "consumo":
                return 1
        }
    }

    atualizar(tipo, objeto) {
        switch (tipo) {
            case "referencia":
                // Troca o título
                $(".prato-selecionado")[0].children[0].textContent = objeto.textContent.split(".")[0];

                var camposInformacao = $(".referencia .informacoes-prato-item");
                // var itens = [nome, peso, kcal, prot, carb, gord]

                for (let i = 0; i <= camposInformacao.length - 1; i++) {
                    camposInformacao[i].children[1].value =
                        Registro.retornar("referencia", objeto.textContent.toString().replace(" ", "").split(".")[0])[i]
                }
                break
        }
    }
}