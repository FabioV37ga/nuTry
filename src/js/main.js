document.querySelector("body").onload = (() => {
    window.alert("Projeto em desenvolvimento! Muitas funções ainda não foram implementadas.")
    // LOG
    console.log("%c#main #Inicializar", "color: #f8a551")

    // Inicializa registro
    // Registro.inicializar()

    // Inicializa calendário
    Calendario.inicializar();
    Calendario.atualizar(Calendario.dataAtual);

    // Habilita inputs do usuário
    Input.habilitar("calendario");
    Input.habilitar("dia");
    Input.habilitar("refeicao");
    Input.habilitar("prato");
    Input.habilitar("consumo");
})
