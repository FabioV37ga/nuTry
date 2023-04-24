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
            case "limpar":
                var referencia = $(".referencia .informacoes-prato-item")
                var consumo = $(".consumido .input")

                for (let i = 0; i <= consumo.length - 1; i++) {
                    // console.log(consumo[i].children[1].value)
                    referencia[i].children[1].setAttribute("value", '')
                    consumo[i].children[0].setAttribute("value", '')
                }

                $(".prato-selecionado")[0].children[0].textContent = "Novo prato"
                break;
            case "referencia":
                var camposInformacao = $(".referencia .informacoes-prato-item");
                switch (parte) {
                    case "itens":
                        if (objeto != null) {
                            // Troca o título
                            $(".prato-selecionado")[0].children[0].textContent = objeto.textContent.split(".")[0];
                            // Troca os campos de valor nutricional para os registrados
                            for (let i = 0; i <= camposInformacao.length - 1; i++) {
                                camposInformacao[i].children[1].setAttribute("value",
                                    Registro.retornar("referencia", objeto.textContent.toString().split(".")[0].trim())[i])
                            }
                        } else {
                            for (let i = 0; i <= camposInformacao.length - 1; i++) {
                                camposInformacao[i].children[1].setAttribute("value", "")
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
            case "consumo":
                var camposReferencia = $(".referencia .informacoes-prato-item");
                var camposConsumo = $(".consumido .input")

                for (let i = 0; i <= camposReferencia.length - 1; i++) {
                    console.log(camposConsumo[i].children[0])
                    camposConsumo[i].children[0].setAttribute("value", camposReferencia[i].children[1].value)
                    camposConsumo[i].children[0].textContent = camposReferencia[i].children[1].value.toString()
                }

                break

        }
    }

    verificar() {
        if (
            $(".referencia .nome")[0].children[1].value
                .toString()
                .trim()
                .replaceAll(" ", "") != ""
            &&
            $(".consumido .nome .input")[0].children[0].value
                .toString()
                .trim()
                .replaceAll(" ", "") != "") {
            return 1
        } else {
            return 0
        }
    }

    salvar() {

    }
}