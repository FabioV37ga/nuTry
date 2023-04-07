class Registro {
    static registro;
    static data;

    static inicializar() {
        // Iniciaiza a classe, verifica existência do JSON no localStorage.
        localStorage.setItem("registro",
            localStorage.getItem("registro") === null
                ? []
                : localStorage.getItem("registro")
        )
        // Atribui o JSON p/ Registro.registro
        this.registro = localStorage.getItem("registro")
    }

    static verificar(dia, mes, ano) {
        this.data = [dia, mes, ano];
    }

    static registrar() {

    }

    static editar() {

    }

    static apagar() {

    }
}