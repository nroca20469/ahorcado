/*7 errores
funciona con el teclado de la pantalla
Error es em rojo el boton
Correcto es verde en el botonEl marcador va contando el nº de errores restantes
Reloj que va avanzando 

Array de x palabras, coge una al azar, ependiendo de la categoria/tematica.
*/

//Guardar valores en variables
const arrayParaules = ['hola', 'adeu', 'daw', 'estetoscopio', 'microscopio', 'ordenador', 'romano', 'casa'];
const arrayLletres = document.querySelectorAll('.lletra');

const lletres = document.getElementById('lletres');
const paraula = document.getElementById('paraula');
const intents = document.getElementById('intents');
const errors = document.getElementById('errors');
const cronometro = document.getElementById('cronometro');  //Cronometro


const btnComenzar = document.getElementById('empezar');
const btnReintentar = document.getElementById('reintentar');
const acabat = document.getElementById('acabat');

let arrayParaula;
let arrayIntent;
let contadoCorrectes; 
let cuentaAtras;
let partidaAcabada = false;
//Temporizador general
let fecha = new Date();
fecha.setHours(0,1,0,0); //1 min
let horas = fecha.getHours();
let minutos = fecha.getMinutes();
let segundos = fecha.getSeconds();
cronometro.innerHTML = '00' + ":" + '01' + ":" + '00';



//Funcions
function paraulaRandom() {
   // console.log(arrayParaules.length);
    let random = Math.floor(Math.random() * (arrayParaules.length));
    let palabra = arrayParaules[random];
    separarParaula(palabra);
}

function empezarCronometro() {
    cuentaAtras = setInterval(cronometroFunction, 1000);
    console.log("Cuenta atras: " + cuentaAtras);
   
}

function cronometroFunction() {

    // console.log('Si pasa');
        if(minutos == 0 && horas == 0 && segundos == 0 ) {
            // clearInterval(cuentaAtras);
            cronometro.innerHTML = '00' + ":" + '00' + ":" + '00';
            partidaAcabada = true;   
        } else {
            segundos = segundos % 60;
            // console.log(segundos);
    
           /* if (minutos ===0 && segundos ===0){
                alert ("Se agotó su tiempo");
                partidaAcabada = true;
                clearTimeOut(llamada);
            }*/
    
           /* if(minutos == 0 && segundos != 0 && horas != 0){
                minutos = 60;
                horas -= 1;
    
                fecha.setHours(horas);
            }
    
            if(segundos == 0 && minutos != 0 && horas != 0 ){
                minutos -= 1;
                segundos = 60;
                fecha.setMinutes(minutos); 
            }*/
    
            if (segundos == 0){
                minutos --;  //Bajar el minuto
                segundos += 60;   //Bajar a 60 los segunods
            }
    
            segundos--;  
        
    }
    
        if(horas < 10 && horas !== '00') { horas = "0" + horas; }
        if(minutos < 10 && minutos !== '00'){ minutos = "0" + minutos; }
        if(segundos < 10 && segundos !== '00'){ segundos = "0" + segundos; }      // console.log(segundos);

        fecha.setSeconds(segundos);
        cronometro.innerText = horas + ":" + minutos + ":" +segundos;

        if(partidaAcabada) {
            acabat.style.display = "block";
            btnReintentar.style.display = "inline";
            lletres.style.cursor = 'default';
        }

}

function separarParaula(paraulaSeparada) {
    arrayParaula = paraulaSeparada.split('');
    arrayIntent = new Array(arrayParaula.length);

    arrayIntent.fill('-');
    // console.log(arrayIntent);

    actualizarPalabra();
}

function actualizarPalabra() {
    paraula.innerText = "";
    
    arrayIntent.forEach((lletra) => {
        paraula.innerText += " " + lletra;
    });  
}

function guardarLletres(lletraIntent) {
    let minuscula = lletraIntent.toLowerCase();

    let correcte = false;
    let buida = true;
    contadoCorrectes = 0;

    arrayParaula.forEach((lletra, index)=> {

        if(lletra == minuscula || lletra == lletraIntent) {
            arrayIntent[index] = lletra;
            correcte = true;
        }

        if(arrayIntent[index] != '-') {
            contadoCorrectes ++;
            console.log('Correctes: ' + contadoCorrectes);
        }
  
    });
   
    if(correcte) {
        actualizarPalabra();
        return correcte;
    } else {
        errors.innerText++;
        return correcte;
    }
}

function lavarLetras() {
    let letra;
    lletres.childNodes.forEach((lletra) => {

        if(lletra.className == 'lletra incorrecte' || lletra.className == 'lletra correcte' ) {
            lletra.className = 'lletra'
            console.log(lletra.className);
        }

    });
    console.log(lletres.childNodes);
}


//Events
btnComenzar.addEventListener('click', (e)=> {
    intents.innerHTML = 7;
    errors.innerHTML = 0;
    clearInterval(cuentaAtras);
    empezarCronometro();

    paraulaRandom();
    btnComenzar.style.display="none";
    //CAMBIAR CURSOR UNA VEZ EMPEZADO EL JUEGO Y QUE ANTES NO PUEDAN CLICAR

    
}); 

btnReintentar.addEventListener('click', (e) => {
    lavarLetras();
    arrayParaula = null;
    arrayIntent = null;
    contadoCorrectes = 0; 
    intents.innerHTML = 7;
    errors.innerHTML = 0;
    clearInterval(cuentaAtras);
    empezarCronometro();

    paraulaRandom();

    btnComenzar.style.display="none";
    btnReintentar.style.display = "none";
    acabat.style.display = "none";
    partidaAcabada = false;
})

// do {
    
lletres.addEventListener('click', (e) => {
    // console.log(typeof e.target.classList.value);
    if(btnComenzar.style.display == "none" && e.target.classList.value != 'lletres') {
        // console.log('my fault');
            if(e.target.classList.value != 'lletra incorrecte' && e.target.classList.value != 'lletra correcte') { 
                let lletreCorIncor = guardarLletres(e.target.innerHTML);
                console.log(e.target.classList.value);

                if(lletreCorIncor) {
                    e.target.classList.add('correcte');
                } else {
                    e.target.classList.add('incorrecte');

                }
                
                // console.log(e.target.classList);
                // intents = 8-(+intents.innerHTML+1);
                
                intents.innerText = 7-errors.innerHTML ;
                console.log(intents.innerHTML);

                if(errors.innerHTML == 7) {
                    partidaAcabada = true;
                } else if(contadoCorrectes == arrayIntent.length) {
                    partidaAcabada = true;
                }
            }
    }
    
});


// } while(partidaAcabada == false);