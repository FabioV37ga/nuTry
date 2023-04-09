class Registro {
    static registro;
    static dadosRegistro;
    static dadosTemporarios;
    static data;

    static inicializar() {
        // Iniciaiza a classe, verifica existência do JSON no localStorage.
        localStorage.setItem("registro",
            localStorage.getItem("registro") === null
                ? '[]'
                : localStorage.getItem("registro")
        )
        // Atribui string do JSON p/ Registro.registro
        this.registro = localStorage.getItem("registro");
        // Atribui JSON para Registro.dadosRegistro
        this.dadosRegistro = JSON.parse(this.registro);

        // LOG
        console.log(
            `%c#Registro #inicializar \n Valor:%c ` +
            this.registro, "color:#fff9ad", "color:white"
        )
    }

    static buscar(dia, mes, ano) {
        // Define anotação que está sendo manipulada em this.data
        this.data = [dia, mes, ano];
        for (let i = 0; i <= this.dadosRegistro.length - 1; i++) {
            var itemRegistro = this.dadosRegistro[i];
            if (itemRegistro.dia == dia &&
                itemRegistro.mes == mes &&
                itemRegistro.ano == ano
            ) {
                // Retorna a anotação do dia selecionado.
                return itemRegistro
            }
        }
    }

    static gerar(tipo) {
        var itemRegistro = this.buscar(this.data[0], this.data[1], this.data[2]);
        switch (tipo) {
            case "iniciar":
                this.dadosTemporarios = itemRegistro == null ? new Object() : itemRegistro
                break
            case "dia":
                this.dadosTemporarios.dia = this.data[0]
                this.dadosTemporarios.mes = this.data[1]
                this.dadosTemporarios.ano = this.data[2]
                console.log(this.dadosTemporarios)
                break
            case "refeicoes":
                this.dadosTemporarios
        }
    }

    static registrar(tipo) {
        switch (tipo) {
            case "dia":
                Dia.janela.fechar()
                break;
            case "refeicao":
                break;
            case "prato":
                break;
        }

        if (this.dadosTemporarios.refeicoes != null) {
            console.log("registrar: ")
            localStorage.setItem("registro", JSON.stringify(this.dadosRegistro))
            Calendario.atualizar(Calendario.gerar("atual"))
            this.dadosRegistro.push(this.dadosTemporarios)
        }
    }

    static editar() {

    }

    static apagar() {

    }
}