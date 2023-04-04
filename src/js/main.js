document.querySelector("body").onload = (() =>{
    // Inicializa calendário
    Calendario.criar();
    Calendario.dataAtual = Calendario.gerar("atual");
    Calendario.atualizar(Calendario.dataAtual);
    // Imprime data atual no console
    console.log(Calendario.dataAtual)
    // Habilita inputs do usuário
    Input.habilitar("calendario");
    Input.habilitar("dia");
    Input.habilitar("refeicao");
})
