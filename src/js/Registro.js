class Registro {
    branch;

    // Inicializa o registro, se não existe é criado.
    inicializar() {
        localStorage.setItem(this.branch,
            localStorage.getItem(this.branch) != null ? localStorage.getItem(this.branch) : '[]')
    }

    // Registra um novo objeto no registro
    registrar(objeto) {
        switch (this.branch) {
            // Registr um objeto do tipo referencia
            case "referencia":
                // "GET" registro
                var pratos = JSON.parse(localStorage.getItem("referencia"))

                // Adiciona item ao registro
                pratos.push(objeto)
                localStorage.setItem("referencia", JSON.stringify(pratos))

                // Atualiza elementos visuais
                Prato.atualizar("referencia", "titulo", objeto.nome)
                // LOG
                console.log(`%c#Registro #registrar \n Branch: %c${this.branch}\n %cObjeto: %c${JSON.stringify(objeto)}`, "color:tomato", "color:white", "color:tomato", "color:white")
                break

            case "consumo":
                var registro = JSON.parse(localStorage.getItem("consumo"))
                console.log(registro)
                registro.push(objeto)
                localStorage.setItem("consumo", JSON.stringify(registro))
                break
        }
    }

    // Edita um objeto registrado
    editar(objeto, conteudo) {

        switch (this.branch) {
            // Edita objetos do tipo referência
            case "referencia":
                // "GET" registro
                var registro = localStorage.getItem("referencia")
                registro = JSON.parse(registro)

                // Redefine todos os campos do objeto selecionado com os novos valores inseridos pelo usuário.
                for (let i = 0; i <= registro.length - 1; i++) {
                    if (registro[i]) {
                        if (registro[i].nome == objeto) {
                            registro[i].peso = conteudo.peso
                            registro[i].kcal = conteudo.kcal
                            registro[i].prot = conteudo.prot
                            registro[i].carb = conteudo.carb
                            registro[i].gord = conteudo.gord

                            // Redefine registro com o objeto editado
                            localStorage.setItem("referencia", JSON.stringify(registro))
                            // Log
                            console.log(`%c#Registro #editar\n Item: %c"${objeto}"\n %cNovo valor: %c${JSON.stringify(conteudo)}`, "color: #b88df7", "color: white", "color: #b88df7", "color: white")
                        }
                    }
                }
                break
            case "consumo":
                var registro = localStorage.getItem("consumo")
                registro = JSON.parse(registro)
                for (let i = 0; i <= registro.length - 1; i++){
                    if (objeto.dia == registro[i].dia &&
                        objeto.mes == registro[i].mes &&
                        objeto.ano == registro[i].ano){
                            registro[i].refeicoes = objeto.refeicoes
                            localStorage.setItem("consumo", JSON.stringify(registro))
                            break
                        }
                }
                break
        }
    }

    // Apaga um objeto registrado
    static apagar(tipo, objeto) {
        switch (tipo) {
            // Apaga objetos do tipo referência
            case "referencia":
                // "GET" registro
                var registro = localStorage.getItem("referencia")
                registro = JSON.parse(registro)

                for (let i = 0; i <= registro.length - 1; i++) {
                    if (registro[i].nome == objeto) {

                        // Quando o objeto a ser apagado estiver selecionado [...]
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
                            // Troca elementos visuais
                            Prato.atualizar("referencia", "itens", null)
                            Prato.atualizar("referencia", "titulo", "apagar")
                        }

                        // Apaga objeto do registro
                        console.log(`%c#Registro #apagar\n Objeto: %c${JSON.stringify(registro[i])}`, "color: #ff00c8", "color: white")
                        delete registro[i]

                        // Redefine o registro com o objeto a menos
                        localStorage.setItem("referencia",
                            JSON.stringify(registro)
                                .replaceAll(",null,", ",")
                                .replaceAll("null,", "")
                                .replaceAll(",null", "")
                                .replaceAll("null", "")
                        )

                        // Atualiza visualmente os objetos
                        Referencia.atualizar("lista")
                    }
                }
                break
        }
    }

    // Retorna um objeto registrado a partir de seu tipo e nome
    static retornar(tipo, objeto) {
        // "GET" registro
        var registro = localStorage.getItem(tipo)
        registro = JSON.parse(registro)

        switch (tipo) {
            // Retorna objetos do tipo referência
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
            // Retorna objetos do tipo consumo
            case "consumo":
                // console.log(registro)
                if (JSON.stringify(registro) != '[]') {
                    for (let i = 0; i <= registro.length - 1; i++) {
                        if (
                            registro[i].dia == objeto.dia &&
                            registro[i].mes == objeto.mes &&
                            registro[i].ano == objeto.ano
                        ) {
                            return registro[i]
                        } else if (i == registro.length - 1) {
                            return false
                        }
                    }
                }else{
                    return false
                }
                break
        }
    }
}