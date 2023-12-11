    /*7 errores
funciona con el teclado de la pantalla
Error es em rojo el boton
Correcto es verde en el botonEl marcador va contando el nº de errores restantes
Reloj que va avanzando 

Array de x palabras, coge una al azar, ependiendo de la categoria/tematica.
*/

//VARIABLES
//const arrayParaules = ['hola', 'adeu', 'daw', 'estetoscopio', 'microscopio', 'ordenador', 'romano', 'casa'];
const coches = ['renault', 'seat', 'ford', 'fiat', 'dacia', 'opel', 'volkswagen', 'ferrari', 'jeep'];
const deportes = ['backetball', 'football', 'rugby', 'skateboard', 'tenis', 'gimnasia'];
const anime = ['haikyuu', 'bleach', 'another', 'anohana', 'naruto'];
const historia = ['darwin', 'aristoteles', 'napoleon', 'cesar', 'platon', 'einstein', 'washington', 'shakespeare'];
const planetas = ['mercurio', 'venus', 'tierra', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno'];
const tabla = ['litio', 'calcio', 'azufre', 'sodio', 'estroncio', 'selenio', 'potasio', 'bario', 'telurio', 'hidrogeno']

//Letras + palabra que se mostrara por pantalla
const arrayLletres = document.querySelectorAll('.lletra');
const lletres = document.getElementById('lletres');
const paraula = document.getElementById('paraula');
const categoria = document.getElementById('categoria');

//Mostrar por pantalla(son numeros(contadores))
const intents = document.getElementById('intents');
const errors = document.getElementById('errors');

//Cronometro
const cronometro = document.getElementById('cronometro');  //Cronometro
const cronometroLetra = document.getElementById('cronometroLetra');

//Botones
const btnComenzar = document.getElementById('empezar');
const btnReintentar = document.getElementById('reintentar');
const acabat = document.getElementById('acabat');

//Variables globales para ir usando y cambiando
let cat = "";
let arrayParaula;
let arrayIntent;
let contadoCorrectes; 
let partidaAcabada = false;

//Temporizador general
let cuentaAtras;
let fecha = new Date();
cronometro.innerHTML = '00' + ":" + '01' + ":" + '00';

//Temporizador letra
let acabadoTiempoLetra = false;
let cuentaAtrasLetra;
let fechaLetra = new Date();
cronometroLetra.innerHTML = '00' + ":" + '00' + ":" + '15';

//Guardar cronos, para mostrar una vez empieze
document.getElementById('crono').style.display = "none";
document.getElementById('cronoLetra').style.display = "none";
document.querySelector('.cronos').style.display = "none";

//FUNCTIONS
function paraulaRandom() {  //Elige la palabra de manera random
    let random;
    let palabra;
    if(cat != "") {
        if(cat == 'anime') {
            random = Math.floor(Math.random() * (anime.length));
            palabra = anime[random];
        } else if (cat == 'coches') {
            random = Math.floor(Math.random() * (coches.length));
            palabra = coches[random];
        } else if (cat == 'deportes') {
            random = Math.floor(Math.random() * (deportes.length));
            palabra = deportes[random];
        } else if (cat == 'historia') {
            random = Math.floor(Math.random() * (historia.length));
            palabra = historia[random];
        } else if (cat == 'planetas') {
            random = Math.floor(Math.random() * (planetas.length));
            palabra = planetas[random];
        } else if (cat == 'tabla') {
            random = Math.floor(Math.random() * (tabla.length));
            palabra = tabla[random];
        }
    }

    separarParaula(palabra); //Separar palabra en un array
}

function empezarCronometro() {  //Empieza el cornometro
    fecha.setHours(0,1,0,0); //Poner el tiempo a 1 minuto

    horas = fecha.getHours(); //Guardar los valores
    minutos = fecha.getMinutes();
    segundos = fecha.getSeconds(); 

    cronometro.innerHTML = '00' + ":" + '01' + ":" + '00'; //Empezar con el minuto

    cuentaAtras = setInterval(cronometroFunction, 1000); //Empezar con el intervalo cada segundo
}

function cronometroFunction() { //Es el cronometro en si(como el interior)

    if(!partidaAcabada) { //Si  o ha acabado la partida, que siga corriendo el timepo
        if(minutos == 0 && horas == 0 && segundos == 0 ) {
            cronometro.innerHTML = '00' + ":" + '00' + ":" + '00';
            partidaAcabada = true;   
        } else {
            segundos = segundos % 60;
    
            if (segundos == 0){
                minutos --;  //Bajar el minuto
                segundos += 60;   //Bajar a 60 los segunods
            }
            segundos--;  //Bajar los segundos en cada pasada
        }
    }

    //Si son menores que 10 cada uno i no tienen el 00 escrito en string, se cambiara, sino no(ya que se van añadiendo los ceros y se vuelve imposible leer XD)
    if(horas < 10 && horas !== '00') { horas = "0" + horas; }
    if(minutos < 10 && minutos !== '00'){ minutos = "0" + minutos; }
    if(segundos < 10 && segundos !== '00'){ segundos = "0" + segundos; }

    fecha.setSeconds(segundos);  //Cambiar los segundos
    cronometro.innerText = horas + ":" + minutos + ":" +segundos;

    if(partidaAcabada) {  //Si la partida ha acabado, que acabe todo
        acabar();
    }

}

function empezarCronometroLetra() {
    fechaLetra.setHours(0,0,15,0);

    horasLetra = fechaLetra.getHours();
    minutoLetra = fechaLetra.getMinutes();
    segundosLetra = fechaLetra.getSeconds();

    cronometroLetra.innerHTML = '00' + ":" + '00' + ":" + '15';

    cuentaAtrasLetra = setInterval(cronometroletraFunction, 1000); //Empezar con el intervalo cada segundo
}

function cronometroletraFunction() {
    if(minutoLetra == 0 && horasLetra == 0 && segundosLetra == 0 ) {
        cronometroLetra.innerHTML = '00' + ":" + '00' + ":" + '00';
        acabadoTiempoLetra = true;
    } else {
        segundosLetra = segundosLetra % 60;

        if (segundosLetra == 0){
            minutoLetra --;  //Bajar el minuto
            segundosLetra += 60;   //Bajar a 60 los segunods
        }
        segundosLetra--;  //Bajar los segundos en cada pasada
    }

    if(horasLetra < 10 && horasLetra !== '00') { horasLetra = "0" + horasLetra; }
    if(minutoLetra < 10 && minutoLetra !== '00'){ minutoLetra = "0" + minutoLetra; }
    if(segundosLetra < 10 && segundosLetra !== '00'){ segundosLetra = "0" + segundosLetra; }

    fechaLetra.setSeconds(segundosLetra);  //Cambiar los segundos
    cronometroLetra.innerText = horasLetra + ":" + minutoLetra + ":" +segundosLetra;

    if(acabadoTiempoLetra) {
        errors.innerHTML++;
        intents.innerHTML--;
        console.log(errors.innerHTML);
        acabadoTiempoLetra = false;
        clearInterval(cuentaAtrasLetra);
        empezarCronometroLetra();
    }

}

function separarParaula(paraulaSeparada) { //Funcion que separa la palabra en array, y la convierte 1 en array i 2 en un array de intentos ('-')
    arrayParaula = paraulaSeparada.split('');
    arrayIntent = new Array(arrayParaula.length);

    arrayIntent.fill('-');

    actualizarPalabra();  //Actualizar el div de palabra
}

function actualizarPalabra() { //Actualiza el div con id de palabra, por la palabra que aparezca(i con las letras, a medida que vayan apareciendo)
    paraula.innerText = "";
    
    arrayIntent.forEach((lletra) => {
        paraula.innerText += " " + lletra;
    });  
}

function guardarLletres(lletraIntent) {  // Guardar las palabras en el array de intento, i cuenta el numero de correctas e incorrectas.
    let minuscula = lletraIntent.toLowerCase();

    let correcte = false;
    let buida = true;
    contadoCorrectes = 0;

    arrayParaula.forEach((lletra, index)=> {

        if(lletra == minuscula || lletra == lletraIntent) {
            arrayIntent[index] = lletra;  //Cambiua el '-' por la letra correcta
            correcte = true;
        }

        if(arrayIntent[index] != '-') {  //Si ya es correcta, el contador de correctas, suma una por cada uno
            contadoCorrectes ++;
        }

    });

    if(correcte) {  //Si es correcta ser actualiza y devuelve que si
        actualizarPalabra();
        return correcte;
    } else {  //Sino actualiza el contador de errores y devuelve que no
        errors.innerText++;
        return correcte;
    }
}

function lavarLetras() {  //Lavar las letras una vez finalizada la partida(i clicada reiniciar)
    lletres.childNodes.forEach((lletra) => {

        if(lletra.className == 'lletra incorrecte' || lletra.className == 'lletra correcte' ) {
            lletra.className = 'lletra'  //Cambiamos el noombre de la clase a 'lletra'
        }

    });
}

function acabar() {  //Una vez acabado el juego mostrar por pantalla
    acabat.style.display = "block";
    btnReintentar.style.display = "inline";
    lletres.style.cursor = 'default';
    document.getElementById('crono').style.display = "none";
    document.getElementById('cronoLetra').style.display = "none";
    document.querySelector('.cronos').style.display = "none";

}

function guardarLocal(palabra, nerrores, tempstotal) {  //Funcion para guardar en local
    let tempsTotal = 60-tempstotal; //Calculamos el timepo teniendo en cuenta que solo tiene 1 minuto
   
    let array = JSON.parse(localStorage.getItem(palabra));
    
    let buscar = buscarLocal(palabra);  //Miramos si la palabvra ya esta en localStorages

    let json = [nerrores, tempsTotal]; //Guaradmos en un array, para despues tenerlo ordenado


    if(buscar != null) {  //Si esta

        let compErrores = compararErrors(buscar, nerrores);  //Comparamos el numero de errores
        let compTotal = compararTiempo(buscar, tempsTotal);   //Comparar el tiempo empleado
        json = null;
        if(compErrores || compTotal) {
            if(compErrores || compTotal) {
                json = [nerrores, tempsTotal];
            } else if(compErrores) {
                json = [nerrores, array[1]];
            } else {
                json = [nerrores, array[0]];
            }
            
            localStorage.setItem(palabra, JSON.stringify(json));  //Si una de las dos es diferete, actualizamos
        } 

    } else {  //Sino directamente la añadimos
        localStorage.setItem(palabra, JSON.stringify(json));   
    }
}

function buscarLocal(palabra) {  //Funcion para buscar si esta en local(devuelve la palabra si existe, sino, devuelve null)

    let partida = null;
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) == palabra){  //Buscamos por key, la palabra es la key
            partida = localStorage.key(i);  //Guardamos la palabra en la var partida
        }
    }

    return partida;
}

function compararTiempo(buscar, tempsTotal) {
    let comparar = false; //Devolvemos comparar

    let array = JSON.parse(localStorage.getItem(buscar));   //Cogemos el numero de erroess i el tiempo total del localStorage

    if(tempsTotal < array[1]) {  //Si el tiempo actual es menor, devolvemos true
        comparar = true;
    }

    return comparar;
}

function compararErrors(palabra, nErrors) {  //Funicon que compara si hay mejoria de alguna de las dos(errores, tiempo)

    let comparar = false; //Devolvemos comparar

    let array = JSON.parse(localStorage.getItem(palabra));   //Cogemos el numero de erroess i el tiempo total del localStorage

    if(nErrors < array[0]) {  //Si el numero de errores es menor, devolvemos true
        comparar = true;
    }

    return comparar;
}

//EVENTS
btnComenzar.addEventListener('click', (e)=> {
    intents.innerHTML = 7;  //Inicializamos a 7 el numero de intentos
    errors.innerHTML = 0; //Inicializamos a  el numero de errores
    
    //Empezamos los cronometros
    clearInterval(cuentaAtras); 
    empezarCronometro();
    clearInterval(cuentaAtrasLetra);
    empezarCronometroLetra();

    paraulaRandom();  //Buscamos que palabra sera
    
    //Mostramos los divs generales de los cronometros
    document.getElementById('crono').style.display = "block";  
    document.getElementById('cronoLetra').style.display = "block";
    document.querySelector('.cronos').style.display = "inline-block";

    btnComenzar.style.display="none";  //Desaparece el boton de comenzar
}); 

btnReintentar.addEventListener('click', (e) => {
    lavarLetras();  //Lavamos los campos

    //Vaciamos las variables locales
    arrayParaula = null;  
    arrayIntent = null;
    contadoCorrectes = 0; 
    partidaAcabada = false;

    //Inicalizamos todas las variables del html como al principio
    intents.innerHTML = 7;
    errors.innerHTML = 0;

    //Guardamos los botones i los divs que no utilizaremos
    btnComenzar.style.display="none";
    btnReintentar.style.display = "none";
    acabat.style.display = "none";

    //Mostramos los divs generales de los cronometros
    document.getElementById('crono').style.display = "block";  
    document.getElementById('cronoLetra').style.display = "block";
    document.querySelector('.cronos').style.display = "inline-block";

    //Empezamos los cronometro
    clearInterval(cuentaAtras);
    empezarCronometro();
    clearInterval(cuentaAtrasLetra);
    empezarCronometroLetra();

    //Elegimos palabra de manera random
    paraulaRandom();
})

lletres.addEventListener('click', (e) => {   //Al clicar en la leltra, se guardara la letra y se mostrara su color correspoiente
   
    if(intents.innerHTML >= 0 && !partidaAcabada) {  //Si la partida no ha acabado y aun hay intentos

        if(btnComenzar.style.display == "none" && e.target.classList.value != 'lletres') { 

            if(e.target.classList.value != 'lletra incorrecte' && e.target.classList.value != 'lletra correcte') { 

                let lletreCorIncor = guardarLletres(e.target.innerHTML);  //Devuelve si la letra es correcta o incorrecta

                if(lletreCorIncor) {  //Si no es correcta es incorrecta, lo guardamos con las clases
                    e.target.classList.add('correcte');
                } else {
                    e.target.classList.add('incorrecte'); 
                }
                                
                intents.innerText = 7-errors.innerHTML;  // Restamos intentos con los errores

                if(errors.innerHTML == 7) {
                    partidaAcabada = true;
                } else if(contadoCorrectes == arrayIntent.length) {
                    //Guardamos las cosas en variables, para pasarlo mas facilemte
                    let palabra = paraula.innerHTML;
                    let nErrors = errors.innerHTML;
                    let tempsTotal = fecha.getSeconds();

                    guardarLocal(palabra, nErrors, tempsTotal);  //Mirar si se guarda en local
                    
                    partidaAcabada = true; //Acabamos la partida
                }

            }
        }

        acabadoTiempoLetra = false;  //Reanudamos a false el tiempo por letra
        
        clearInterval(cuentaAtrasLetra);  //Reinicamos el cronometro de letra
        empezarCronometroLetra();
    
    } else {

        clearInterval(cuentaAtrasLetra);  // Paramos el cronometro
        clearInterval(cuentaAtras);
        acabar();  //Mostramos el resultado
    }

});

categoria.addEventListener('change', (e) => {
    cat = e.target.value;
})