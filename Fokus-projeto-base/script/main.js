const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const tempBt = document.querySelector('.app__card-primary-button');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes= document.querySelectorAll('.app__card-button');
const iniciarOuPausarbt = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector ('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true
const audioPlay = new Audio('sons/play.wav');
const audioPausa = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')

const startPauseBt = document.querySelector('#start-pause')
let tempoDecorridoEmSegundos = 2500
let intervaloId = null
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
       musica.play() 
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    alterarContexto('foco')
    focoBt.classList.add ('active')

})
curtoBt.addEventListener('click', () =>{
    alterarContexto('descanso-curto')
    curtoBt.classList.add ('active')
})
longoBt.addEventListener('click', () =>{
    alterarContexto('descanso-longo')
    longoBt.classList.add ('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch(contexto){
        case"foco":
            titulo.innerHTML = 
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
        case "descanso-curto":
            titulo.innerHTML =  `Que tal dar uma respirada? <br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break
        default:
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        //audioTempoFinalizado.play()
        alert('Tempo Finalizado!')
        zerar()        
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar (){
    if (intervaloId){
        audioPausa.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBt.textContent ='Pausar'
}
function zerar(){
    startPauseBt.textContent ='Começar'
    clearInterval(intervaloId)
    intervaloId =null
}
function mostrarTempo() {
    const tempo = tempoDecorridoEmSegundos
    tempoNaTela.innerHTML = `${tempo}`
}
mostrarTempo()