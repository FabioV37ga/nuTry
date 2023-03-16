document.querySelector("body").onload = start()

function start() {
    for (let i = 1; i <= 7 * 5; i++){
        var dia = `<a class="dia" value="${i}">${i}</a>`
        $(".janela-inicio_calendario").append(dia)
    }
}
