document.querySelector("body").onload = (() =>{
    Calendario.criar();;
    Calendario.dataAtual = Calendario.gerar("atual");
    Calendario.atualizar(Calendario.dataAtual);
    
    console.log(Calendario.dataAtual)

    Input.habilitar("calendario");
    Input.habilitar("dia");
    Input.habilitar("refeicao");
})
