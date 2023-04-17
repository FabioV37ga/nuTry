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
                var itens = $(".consumo .informacoes-prato-item");
                for (let i = 0; i <= itens.length - 1; i++) {
                    dados[i] = itens[i].children[1].value;
                }
                return dados;
        }
    }

    static atualizar(tipo, parte, objeto) {
        switch (tipo) {
            case "referencia":
                var camposInformacao = $(".referencia .informacoes-prato-item");
                switch (parte) {
                    case "itens":
                        if (objeto != null) {
                            // Troca o título
                            $(".prato-selecionado")[0].children[0].textContent = objeto.textContent.split(".")[0];
                            // Troca os campos de valor nutricional para os registrados
                            for (let i = 0; i <= camposInformacao.length - 1; i++) {
                                camposInformacao[i].children[1].value =
                                    Registro.retornar("referencia", objeto.textContent.toString().split(".")[0].trim())[i]
                            }
                        } else {
                            for (let i = 0; i <= camposInformacao.length - 1; i++) {
                                camposInformacao[i].children[1].value = ""
                            }
                        }
                        break
                    case "titulo":
                        if (objeto == "apagar") {
                            $(".prato-selecionado")[0].children[0].textContent = "Novo prato"
                            // $(".prato-selecionado")[0].children[0].textContent = itens[i].nome
                        } else {
                            $(".prato-selecionado")[0].children[0].textContent = objeto
                        }
                        break
                    case "campos":
                        break
                }
                break
        }
    }

    salvar(){

    }
}