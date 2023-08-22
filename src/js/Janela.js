class Janela {
    elementoJanela;
    elementoFechar;
    elementoBlur;

    abrir() {
        // console.log(this.elementoJanela)
        this.elementoJanela.style.display = "initial"
        this.elementoBlur.classList.add("blur")
    }

    fechar() {
        this.elementoJanela.style.display = "none"
        this.elementoBlur.classList.remove("blur")
    }

    prompt(tipo) {
        var prompt = $(".prompt")[0]
        var prompt_titulo = $(".prompt-conteudo")[0].children[0].children[0]
        var block = $(".prompt-block")[0]

        prompt.style.display = 'initial'
        block.style.display = 'initial'
        console.log(tipo)
        switch (tipo) {
            case "dia":
                prompt_titulo.textContent = "Salvar as alterações no dia antes de fechar?"
                break
            case "refeicao":
                prompt_titulo.textContent = "Salvar as alterações nas refeições antes de fechar?"
                break;
            case "prato":
                prompt_titulo.textContent = "Salvar as alterações nos pratos antes de fechar?"
                // Consumo.anotacao.apagar("prato")
                break
        }

        // Controla botões da janela PROMPT: (descartar e salvar)
        // Salvar
        function handleSaveClick() {

            switch (tipo) {
                case "dia":
                    Consumo.anotacao.salvar("registrar")
                    Dia.janela.fechar()
                    Dia.apagar()
                    break;
                case "refeicao":
                    Refeicao.janela.fechar()
                    break
                case "prato":
                    Prato.janela.fechar()
                    Prato.atualizar("limpar")
                    break
            }
            prompt.style.display = 'none'
            block.style.display = 'none'
            $(".prompt-salvar")[0].removeEventListener("click", handleSaveClick)
        }
        $(".prompt-salvar")[0].addEventListener("click", handleSaveClick)
 

        // Descartar
        function handleCloseClick() {

            switch (tipo) {
                case "dia":
                    Consumo.anotacao.apagar("dia")
                    Dia.janela.fechar()
                    break;
                case "refeicao":
                    Consumo.anotacao.apagar("refeicao")
                    Refeicao.janela.fechar()
                    // Refeicao.atualizar("limpar")
                    break
                case "prato":
                    Consumo.anotacao.apagar("prato")
                    Prato.janela.fechar()
                    Prato.atualizar("limpar")
                    break
            }
            prompt.style.display = 'none'
            block.style.display = 'none'
            $(".prompt-descartar")[0].removeEventListener("click", handleCloseClick)
        }
        $(".prompt-descartar")[0].addEventListener("click", handleCloseClick)
    }
}