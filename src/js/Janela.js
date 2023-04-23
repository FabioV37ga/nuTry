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
        switch (tipo) {
            case "prato":
                console.log("pergunta")
                break
        }
    }
}