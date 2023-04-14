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
                Prato.atualizar("referencia", "titulo", objeto.nome)
                console.log(`%c#Registro #registrar \n Branch: %c${this.branch}\n %cObjeto: %c${JSON.stringify(objeto)}`, "color:tomato", "color:white", "color:tomato", "color:white")
                break
        }
    }

    editar(objeto, conteudo) {
        switch (this.branch) {
            case "referencia":
                var registro = localStorage.getItem("referencia")
                registro = JSON.parse(registro)

                for (let i = 0; i <= registro.length - 1; i++) {
                    if (registro[i]) {
                        if (registro[i].nome == objeto) {
                            registro[i].peso = conteudo.peso
                            registro[i].kcal = conteudo.kcal
                            registro[i].prot = conteudo.prot
                            registro[i].carb = conteudo.carb
                            registro[i].gord = conteudo.gord

                            localStorage.setItem("referencia", JSON.stringify(registro))

                            console.log(`%c#Registro #editar\n Item: %c"${objeto}"\n %cNovo valor: %c${JSON.stringify(conteudo)}`, "color: #b88df7", "color: white", "color: #b88df7", "color: white")
                        }
                    }
                }
                break
        }
    }

    static apagar(tipo, objeto) {
        switch (tipo) {
            case "referencia":

                var registro = localStorage.getItem("referencia")
                registro = JSON.parse(registro)

                for (let i = 0; i <= registro.length - 1; i++) {
                    if (registro[i].nome == objeto) {

                        if (
                            registro[i].nome
                            .toString()
                            .trim() 
                            .toLowerCase()
                            ==
                            $(".prato-selecionado")[0].children[0].textContent
                                .trim() 
                                .toLowerCase()
                        ) {
                            Prato.atualizar("referencia", "titulo", "apagar")
                        }

                        delete registro[i]

                        localStorage.setItem("referencia",
                            JSON.stringify(registro)
                                .replaceAll(",null,", ",")
                                .replaceAll("null,", "")
                                .replaceAll(",null", "")
                                .replaceAll("null", "")
                        )
                        Referencia.atualizar("lista")
                    }
                }
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