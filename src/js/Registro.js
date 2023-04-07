class Registro {
    static registro;
    static dadosRegistro;
    static data;

    static inicializar() {
        // Iniciaiza a classe, verifica existência do JSON no localStorage.
        localStorage.setItem("registro",
            localStorage.getItem("registro") === null
                ? '[{"a":0},{"a":1}]'
                : localStorage.getItem("registro")
        )
        // Atribui o JSON p/ Registro.registro
        this.registro = localStorage.getItem("registro");
        this.dadosRegistro = JSON.parse(this.registro);
        console.log(
            `%c#Registro #inicializar \n Valor:%c ` + 
            this.registro,"color:#fff9ad","color:white"
        )
    }

    static buscar(dia, mes, ano) {
        this.data = [dia, mes, ano];
        for (let i = 0; i <= this.dadosRegistro.length -1; i++){
            var itemRegistro = this.dadosRegistro[i];
            if (itemRegistro.dia == dia &&
                itemRegistro.mes == mes &&
                itemRegistro.ano == ano
                ){
                return itemRegistro
            }
        }
    }

    static registrar(tipo) {
        switch (tipo) {
            case "dia":
                break;
            case "refeicao":
                break;
            case "prato":
                break;
        }
    }

    static editar() {

    }

    static apagar() {

    }
}