class Referencia extends Registro {
    static id;
    static anotacao;
    dados;
    constructor(dados) {
        super()
        this.branch = "referencia"
        this.dados = dados;
        this.inicializar();
        this.formatar();
    }

    formatar() {
        var objeto = new Object()

        objeto.nome = this.dados[0] != '' ? this.dados[0] : null;
        objeto.peso = this.dados[1] != '' ? this.dados[1] : 0;
        objeto.kcal = this.dados[2] != '' ? this.dados[2] : 0;
        objeto.prot = this.dados[3] != '' ? this.dados[3] : 0;
        objeto.carb = this.dados[4] != '' ? this.dados[4] : 0;
        objeto.gord = this.dados[5] != '' ? this.dados[5] : 0;

        this.dados = objeto;
    }

    verificar() {
        var registro = localStorage.getItem("referencia");
        registro = JSON.parse(registro);
        if (registro.length > 0) {
            for (let i = 0; i <= registro.length - 1; i++) {
                if (registro[i].nome != this.dados.nome) {
                    if (i == registro.length - 1) {
                        Referencia.anotacao.registrar(Referencia.anotacao.dados)
                    }
                } else {
                    console.log("Nome já registrado.")
                    break
                }
            }
        } else {
            Referencia.anotacao.registrar(Referencia.anotacao.dados)
        }
    }

    static atualizar(tipo) {

        var elementoItem =
            `
        <li class="lista-pratos-item">
            <a href="#">
            </a>
        </li>
        `
        var itens = localStorage.getItem("referencia");
        itens = JSON.parse(itens)

        switch (tipo) {
            case "lista":
                if ($(".lista-pratos-item").length > 0) {
                    $(".lista-pratos-item").remove()
                }else{}
                if (itens)
                    for (let i = 0; i <= itens.length - 1; i++) {
                        $(elementoItem).appendTo(".lista-pratos-lista")
                        $(".lista-pratos-item")[i].children[0].textContent =
                            `${itens[i].nome} . ${itens[i].peso} . ${itens[i].kcal} . [...]`
                        // $(".prato-selecionado")[0].children[0].textContent = 
                        // $(".lista-pratos-item")[i].children[0].textContent.split(",")[0]
                        Input.habilitar("referencia")
                    }
                break
        }
    }
}