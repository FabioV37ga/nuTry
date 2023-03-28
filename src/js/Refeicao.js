class Refeicao {
    static abrir() {
        $(".janela-refeicao")[0].style.display = "initial";
        $(".janela-dia")[0].classList.add("blur")

        Dia.desligar()
        this.ligar()
    }

    static ligar() {
        $(".outside")[0].style.zIndex = 3;
        $(".outside")[0].addEventListener("click", this.fechar)
        $(".fechar-refeicao")[0].addEventListener("click", this.fechar)
    }

    static fechar() {
        $(".outside")[0].style.zIndex = 1;
        $(".janela-refeicao")[0].style.display = "none";
        $(".janela-dia")[0].classList.remove("blur")

        this.desligar
        Dia.ligar()
    }

    static desligar() {
        $(".outside")[0].style.zIndex = 2;
        $(".outside")[0].removeEventListener("click", this.fechar)
        $(".fechar-refeicao")[0].removeEventListener("click", this.fechar)
    }
}