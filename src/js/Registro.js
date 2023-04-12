class Registro {

    branch;
    inicializar() {
        localStorage.setItem(this.branch,
            localStorage.getItem(this.branch) != null ? localStorage.getItem(this.branch) : '[]')
    }
    registrar(objeto) {
        switch (this.branch) {
            case "referencia":
                var pratos = JSON.parse(localStorage.getItem("referencia"))
                pratos.push(objeto)
                localStorage.setItem("referencia",JSON.stringify(pratos))
                break
        }
    }
}