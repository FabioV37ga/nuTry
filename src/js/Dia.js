class Dia extends Janela {
    static janela;
    constructor(janela, blur, fechar) {
        super()
        this.elementoJanela = janela;
        this.elementoFechar = fechar;
        this.elementoBlur = blur;
    }

    atualizar(tipo) {

        var registro = Registro.buscar(
            Calendario.dataSelecionada[0],
            Calendario.dataSelecionada[1],
            Calendario.dataSelecionada[2])

        switch (tipo) {
            case "abrir":
                // Atualiza titulo da janela com a data atual
                var dia = Calendario.dataSelecionada[0];
                var mes = Calendario.dataSelecionada[1];
                var mesString = Calendario.gerar()[3];
                var ano = Calendario.dataSelecionada[2];

                $(".janela-dia_titulo")[0].children[0].textContent = `${dia} de ${mesString}, ${ano}`

                // Se houver registro na data selecionada [...]
                if (registro != null) {
                    // Insere elementos da janela DIA
                    for (let i = 0; i <= registro.refeicoes.length - 1; i++) {
                        var elemento =
                            `<div class="item item_${registro.refeicoes[i].id}" >
                             <a href="#">
                                <span>
                                    <img src="src/img/edita.png" class="editar-refeicao">
                                </span>
                             </a>
                             <p>
                                ${registro.refeicoes[i].tipo}
                            </p>
                         </div>`
                        $(elemento).insertBefore($(".adicionar-refeicao")[0])
                    }
                }
                break
            case "fechar":
                if (registro != null) {
                    var itens = document.querySelectorAll(".janela-dia .item")
                    for (let i = 0; i <= itens.length - 1; i++) {
                        if (itens[i].classList.contains("adicionar-refeicao")){
                            break
                        }else{
                            itens[i].remove()
                        }
                    }
                }
                break
        }
    }
}