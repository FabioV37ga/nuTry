document.querySelector("body").onload = (() =>{
    console.log("%c#Inicializar", "color: #f8a551")
    // Inicializa calendário
    Calendario.criar();
    Calendario.dataAtual = Calendario.gerar("atual");
    Calendario.atualizar(Calendario.dataAtual);
    // Habilita inputs do usuário
    Input.habilitar("calendario");
    Input.habilitar("dia");
    Input.habilitar("refeicao");
})
