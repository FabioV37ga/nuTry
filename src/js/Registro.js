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
                localStorage.setItem("referencia", JSON.stringify(pratos))
                console.log(`%c#Registro #registrar \n Branch: %c${this.branch}\n %cObjeto: %c${JSON.stringify(objeto)}`, "color:tomato", "color:white", "color:tomato", "color:white")
                break
        }
    }

    editar() {
        switch (this.branch) {
            case "referencia":
                break
        }
    }

    apagar() {
        switch (this.branch) {
            case "referencia":
                break
        }
    }

    static retornar(tipo, objeto) {
        var registro = localStorage.getItem(tipo)
        registro = JSON.parse(registro)
        switch (tipo) {
            case "referencia":
                for (let i = 0; i <= registro.length - 1; i++) {
                    if (registro[i].nome == objeto) {
                        return [
                            registro[i].nome,
                            registro[i].peso,
                            registro[i].kcal,
                            registro[i].prot,
                            registro[i].carb,
                            registro[i].gord,
                            registro[i]
                        ]
                    }
                }
                break
        }
    }
}