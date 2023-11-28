    /*7 errores
    funciona con el teclado de la pantalla
    Error es em rojo el boton
    Correcto es verde en el botonEl marcador va contando el nº de errores restantes
    Reloj que va avanzando 

    Array de x palabras, coge una al azar, ependiendo de la categoria/tematica.
    */

    //VARIABLES
    const arrayParaules = ['hola', 'adeu', 'daw', 'estetoscopio', 'microscopio', 'ordenador', 'romano', 'casa'];

    //Letras + palabra que se mostrara por pantalla
    const arrayLletres = document.querySelectorAll('.lletra');
    const lletres = document.getElementById('lletres');
    const paraula = document.getElementById('paraula');

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
        let random = Math.floor(Math.random() * (arrayParaules.length));
        let palabra = arrayParaules[random];  //Guardar palabra en una variable

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

        //Si son menores que 10 cada uno i no tienen el 00 escrito en strin, se cambiara, sino no(ya que se van añadiendo los ceros y se vuelve imposible leer XD)
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


    //EVENTS
    btnComenzar.addEventListener('click', (e)=> {
        intents.innerHTML = 7;
        errors.innerHTML = 0;
        clearInterval(cuentaAtras);
        empezarCronometro();
        clearInterval(cuentaAtrasLetra);
        empezarCronometroLetra();

        paraulaRandom();
        document.getElementById('crono').style.display = "block";
        document.getElementById('cronoLetra').style.display = "block";
        document.querySelector('.cronos').style.display = "inline-block";

        btnComenzar.style.display="none";
    }); 

    btnReintentar.addEventListener('click', (e) => {
        lavarLetras();
        arrayParaula = null;
        arrayIntent = null;
        contadoCorrectes = 0; 
        intents.innerHTML = 7;
        errors.innerHTML = 0;
        btnComenzar.style.display="none";
        btnReintentar.style.display = "none";
        acabat.style.display = "none";
        partidaAcabada = false;

        clearInterval(cuentaAtras);
        empezarCronometro();
        paraulaRandom();
    })


    lletres.addEventListener('click', (e) => {   //Al clicar en la leltra, se guardara la letra y se mostrara su color correspoiente
        if(intents.innerHTML >= 0 && !partidaAcabada) {
            if(btnComenzar.style.display == "none" && e.target.classList.value != 'lletres') {
                if(e.target.classList.value != 'lletra incorrecte' && e.target.classList.value != 'lletra correcte') { 
                    let lletreCorIncor = guardarLletres(e.target.innerHTML);

                    if(lletreCorIncor) {
                        e.target.classList.add('correcte');
                    } else {
                        e.target.classList.add('incorrecte');
                    }
                                    
                    intents.innerText = 7-errors.innerHTML ;

                    if(errors.innerHTML == 7) {
                        partidaAcabada = true;
                    } else if(contadoCorrectes == arrayIntent.length) {
                        partidaAcabada = true;
                    }
                }
            }
            acabadoTiempoLetra = false;
            clearInterval(cuentaAtrasLetra);
            empezarCronometroLetra();
        } else {
            clearInterval(cuentaAtrasLetra);
            acabar();
        }
        
        
        
    });