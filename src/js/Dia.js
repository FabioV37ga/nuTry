class Dia extends Janela {
    static janela;
    constructor(janela, blur, fechar) {
        super()
        this.elementoJanela = janela;
        this.elementoFechar = fechar;
        this.elementoBlur = blur;
    }

    atualizar(tipo) {

        // var registro = Registro.buscar(
        //     Calendario.dataSelecionada[0],
        //     Calendario.dataSelecionada[1],
        //     Calendario.dataSelecionada[2])

        switch (tipo) {
            case "abrir":
                // Atualiza titulo da janela com a data atual
                var dia = Calendario.dataSelecionada[0];
                var mes = Calendario.dataSelecionada[1];
                var mesString = Calendario.dataSelecionada[3];
                var ano = Calendario.dataSelecionada[2];

                $(".janela-dia_titulo")[0].children[0].textContent = `${dia} de ${mesString}, ${ano}`
                break
            case "fechar":
                break
        }
    }



    retornarInputs() {

    }

    static criar(sessao, dados){
        switch (sessao) {
            case "dia":
                // console.log(dados.pratos)
                var dadosFormatados = "";
                for (let i = 0; i <= dados.pratos.length - 1; i++) {
                    if (dadosFormatados == "") {
                        dadosFormatados = `${dados.pratos[i].nome} `
                    } else {
                        dadosFormatados += `. ${dados.pratos[i].nome}`
                    }
                }

                var elemento =
                    `
                <div class="item item-registro">
                    <a href="#">
                        <span>
                            <img src="src/img/edita.png" class="editar-refeicao">
                        </span>
                    </a>
                    <p>
                        ${dados.tipo} . ${dadosFormatados}
                    </p>
                </div>
                `
                $(elemento).appendTo(".janela-dia")
                break
        }
    }

    static prompt(){
        console.log("pergunta")
    }
}