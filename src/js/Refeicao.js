class Refeicao{
    static abrir(){
        $(".janela-refeicao")[0].style.display = "initial";
        $(".janela-dia")[0].classList.add("blur")
    }

    static fechar(){
        $(".janela-refeicao")[0].style.display = "none";
        $(".janela-dia")[0].classList.remove("blur")
    }
}