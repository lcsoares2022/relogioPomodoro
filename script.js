const pomodoroBtn = document.getElementById('work') 
const shortBtn = document.getElementById('short')
const longBtn = document.getElementById('long') 
const exibirTempo = document.getElementById("timeDisplay")
const pauseBtn = document.getElementById('pause')
const continueBtn = document.getElementById('continue')
const exibirTexto = document.getElementById('show-text')
const bell = new Audio('./audio/audio_bell.mp3');
const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const aprendiz = document.getElementById('aprendiz');
const graduado = document.getElementById('graduado');
const mestre = document.getElementById('mestre');
const doutor = document.getElementById('doutor');



let temposPomodoro = 25, temposShortBreak = 5, temposLongBreak = 10;


let minutos = 0, segundos = 0, intervaloId, count=0, ciclo=3, totalPomodoro=0;

    
//Função principal

const startTime = () => {   
    if(segundos === 0) {
        if(minutos === 0) {
            clearInterval(intervaloId) /*Limpa o timer definido pelo método setinterval (desativa a função setInterval)*/
            bell.play()
            return;
        }
        
    }
     
    if(segundos > 0) {
        segundos --;
    } else  {
        segundos = 60;
        minutos --;
    } 
    
    const textoDoSegundo = segundos < 10 ? "0" + segundos : segundos; /*O método toString retorna REPRESENTAÇÃO string do objeto na base especificada.*/
    const textoDoMinuto = minutos < 10 ? "0" + minutos : minutos;
    exibirTempo.textContent = textoDoMinuto + ":" + textoDoSegundo; /*textContent retorna o conteúdo textual*/

 
};

if(count > 3) {
    count=1;
    exibirTexto.textContent = count + "/" + ciclo + " " + "("+totalPomodoro+")"
}

//Botões de ação

pomodoroBtn.addEventListener("click", () => {
    clearInterval(intervaloId);
    minutos = temposPomodoro;
    minutos --;  
    segundos = 60;
    count++;
    totalPomodoro++;
    if(count > 3) {
        count=1;
    }
    exibirTexto.textContent = count + "/" + ciclo + " " + "("+totalPomodoro+")"
    intervaloId = setInterval(startTime, 1000);     /*função temporizadora cujos parâmetros é a função que vai será executada em intervalos de tempo definidos pelo segundo parâmetro que se encontra em milisegundo (1000ms=1s).*/
});

shortBtn.addEventListener("click", () => {
    clearInterval(intervaloId);
    minutos = temposShortBreak,
    minutos --;  
    segundos = 60
    intervaloId = setInterval(startTime, 1000);
    
});


longBtn.addEventListener("click", () => {
    clearInterval(intervaloId);
    minutos = temposLongBreak, 
    minutos --;
    segundos = 60
    intervaloId = setInterval(startTime, 1000);
});


pauseBtn.addEventListener("click", () => {
    clearInterval(intervaloId);
});



continueBtn.addEventListener("click", () => {
    clearInterval(intervaloId);
    intervaloId = setInterval(startTime, 1000);
});


// inicio - janela Modal

const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
}


[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal())
})


// Fim - Janela Modal



// TESTE MOCK


const mockTest = {
    usuarios: [
        {usuario: 'guilherme', id: '1'},
        {usuario: 'pedro', id: '2'},
        {usuario: 'lucas', id: '3'},
        {usuario: 'paulo', id: '4'},
    ],
    tempos: [
        {id: '1', nivel: 'aprendiz', pomodoro: '25', shortBreak: '5', longBreak: '10'}, //0
        {id: '2', nivel: 'graduado', pomodoro: '40', shortBreak: '10', longBreak: '15'}, //1
        {id: '3', nivel: 'mestre', pomodoro: '50', shortBreak: '10', longBreak: '15'}, //2
        {id: '4', nivel: 'doutor', pomodoro: '60', shortBreak: '10', longBreak: '20'} //3
    ],
};

let nivelUsuario, pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario, tempoUsuario;

localStorage.setItem("db_usuarios", JSON.stringify(mockTest));

let usuarioAtivo = JSON.parse(localStorage.getItem("db_usuarios"));

console.log(usuarioAtivo);

aprendiz.addEventListener("click", ()=>{
    tempoUsuario=1;                                                                                
    carregarDadosUsuario();
    salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
});

graduado.addEventListener("click", ()=>{
    tempoUsuario=2;
    carregarDadosUsuario();
    salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
});

mestre.addEventListener("click", ()=>{
    tempoUsuario=3;
    carregarDadosUsuario();
    salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
});

doutor.addEventListener("click", ()=>{
    tempoUsuario=4;
    carregarDadosUsuario();
    salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
});



function carregarDadosUsuario() {
    for (let i=0; i<usuarioAtivo.tempos.length; i++) {
        if (usuarioAtivo.tempos[i].id == tempoUsuario) { //Trocar de usuario ativo (escrito no codigo) para usuario ativo conforme LocalStorage
            nivelUsuario = parseInt(usuarioAtivo.tempos[i].id);
            pomodoro_Usuario = parseInt(usuarioAtivo.tempos[i].pomodoro);
            shortBreak_Usuario = parseInt(usuarioAtivo.tempos[i].shortBreak);
            longBreak_Usuario = parseInt(usuarioAtivo.tempos[i].longBreak);
        }
    }
}

function salvarDadosLocalStorage (pomodoro, shortBreak, longBreak) {
    exibirTempo.textContent = `${pomodoro}:00`;
    localStorage.setItem('long_break', longBreak);
    localStorage.setItem('short_break', shortBreak);
    localStorage.setItem('pomodoro', pomodoro);
    temposPomodoro = pomodoro;                                          /*localStorage.getItem("db.usuarios").tempos.*/
    temposShortBreak = shortBreak;
    temposLongBreak = longBreak;
    minutos = 0;
    segundos = 0;
    clearInterval(intervaloId);
}

document.body.onload = () => {
    if(!localStorage.getItem('pomodoro')) {
      exibirTempo.textContent = temposPomodoro + ":" + "00";  
    } 
    else {
     temposPomodoro = localStorage.getItem('pomodoro');
     temposShortBreak = localStorage.getItem('short_break');
     temposLongBreak = localStorage.getItem('long_break');
     exibirTempo.textContent = temposPomodoro + ":" + "00";
    }
 }

/*document.body.onload = () => {
    carregarDadosUsuario();
    switch (nivelUsuario) {
        case 1:
            salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
            break;
        case 2:
            salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
            break;
        case 3:
            salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
            break;
        case 4:
            salvarDadosLocalStorage(pomodoro_Usuario, shortBreak_Usuario, longBreak_Usuario);
            break;
        default:
            break;
    }
}*/




