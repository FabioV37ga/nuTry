class Referencia extends Registro {
    static id;
    static anotacao;
    dados;
    dadosArray;
    constructor(dados) {
        super()
        this.branch = "referencia"
        this.dados = dados;
        this.inicializar();
        this.formatar();
    }

    formatar() {
        var objeto = new Object()

        objeto.nome = this.dados[0] != '' ? this.dados[0].toString().trim() : null;
        objeto.peso = this.dados[1] != '' ? this.dados[1] : 0;
        objeto.kcal = this.dados[2] != '' ? this.dados[2] : 0;
        objeto.prot = this.dados[3] != '' ? this.dados[3] : 0;
        objeto.carb = this.dados[4] != '' ? this.dados[4] : 0;
        objeto.gord = this.dados[5] != '' ? this.dados[5] : 0;

        this.dados = objeto;
        this.dadosArray = [
            objeto.nome,
            objeto.peso,
            objeto.kcal,
            objeto.prot,
            objeto.carb,
            objeto.gord
        ];
    }

    verificar() {
        // 1. GETinput
        //  1.1 Campo preenchido é válido (não é espaço em branco)
        //  1.2 Campo preenchido 

        var registro = localStorage.getItem("referencia");
        registro = JSON.parse(registro);
        if (registro.length > 0) {
            for (let i = 0; i <= registro.length - 1; i++) {
                if (registro[i].nome != this.dados.nome) {
                    if (i == registro.length - 1) {
                        if (this.dados.nome == null) {
                            console.log("Nome inválido.")
                            break
                        }
                        Referencia.anotacao.registrar(Referencia.anotacao.dados)
                    }
                } else {
                    for (let a = 0; a <= Object.entries(registro[i]).length - 1; a++) {

                        if (this.dadosArray[a] == (Object.entries(registro[i])[a])[1]) {
                            if (a == Object.entries(registro[i]).length - 1) {
                                // Tudo igual, não fazer nada.
                                break
                            }
                        } else {
                            Referencia.anotacao.editar(registro[i].nome,
                                Referencia.anotacao.dados)
                        }
                    }
                    break
                }
            }
        } else {
            if (this.dados.nome != null) {
                Referencia.anotacao.registrar(Referencia.anotacao.dados)
            } else {
                console.log("Nome inválido.")
            }
        }
    }

    static atualizar(tipo, argumento) {

        var itens = localStorage.getItem("referencia");
        itens = JSON.parse(itens)

        switch (tipo) {
            case "lista":
                var elementoItem =
                    `
                <li class="lista-pratos-item">
                    <a href="#">
                    </a>
                </li>
                `

                if ($(".lista-pratos-item").length > 0) {
                    $(".lista-pratos-item").remove()
                }

                if (itens)
                    for (let i = 0; i <= itens.length - 1; i++) {
                        if (itens[i]) {
                            $(elementoItem).appendTo(".lista-pratos-lista")
                            $(".lista-pratos-item")[i].children[0].textContent =
                                `${itens[i].nome} . ${itens[i].peso}g . ${itens[i].kcal}kcal . ${itens[i].prot}g . ${itens[i].carb}g`
                            Input.habilitar("referencia")
                        }
                    }

                break
        }
    }
}