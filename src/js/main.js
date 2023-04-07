document.querySelector("body").onload = (() =>{
    
    // LOG
    console.log("%c#main #Inicializar", "color: #f8a551")
    
    // Inicializa registro
    console.log("teste")
    Registro.inicializar()

    // Inicializa calendário
    Calendario.criar();
    Calendario.dataAtual = Calendario.gerar("atual");
    Calendario.atualizar(Calendario.dataAtual);

    // Habilita inputs do usuário
    Input.habilitar("calendario");
    Input.habilitar("dia");
    Input.habilitar("refeicao");
    
})
