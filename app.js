/*Se declaran las variables y se inicializan sin valor (0)
 para darles el valor correcto con la función condicionesIniciales()*/
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];//Se inicializa la lista sin datos [], para poder añadirlos
let numeroMaximo = 10;

console.log(numeroSecreto);//Liena para verificar el valor de #secreto, para pruebas

//declaración y anatomia de la función
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);//Se selecciona el titulo 1 del index.html
    elementoHTML.innerHTML = texto;//Se ustiliza el innerHTML para agregar el texto a la web
    return; //buena practica, colocar el return en funciones.
}

function verificarIntento() {
    /*Se utiliza la función de JS gatElementById para obtener un OBJETO por su ID
    y al fianl con el '.' se extrae un atributo en especifico de la función*/
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);//parseInt para forzar a que se un dato numerico
    //Se utiliza el "===" para validar igualdad en valor y tipo de dato de dos variables
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}!`);//uso del operador ternario
        document.getElementById('reiniciar').removeAttribute('disabled');//se usa el comando removeAttribute para quitar un atributo del index.HTML en especifico y sun nombre en: ('nombreAtributo')
    } else { //cuando el usuario no acierta el numero
        if(numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();//Se invoca la función cuando el usuario no acierta el numero
    }
    return;
}

function limpiarCaja() { //Para el querySelector por Id debe iniciar siempre la busqueda con #
    document.querySelector('#valorUsuario').value = '';//se le asigna valor vacio a la caja despues de sellecionarla con el document.
}

function generarNumeroSecreto() { //funcion para general el numero random entre 1 y un valor maximo variable
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Se pregunta si ya se sortearon todos los numeros de la lista
    if(listaNumerosSorteados.length == numeroMaximo) {//Metodo length entrega el largo o el tamaño del arreglo o la lista
        asignarTextoElemento('p','Ya se han sorteado todos los números posibles');
    } else {
        //Si le #Generado está en la lista, hacemos una operación, sino, se realiza otra operación
        if(listaNumerosSorteados.includes(numeroGenerado)){ //Metodo includes recorre toda la lisat y verifica si el dato ingresado ya está o no en la lista
            return generarNumeroSecreto();//Se usa la recursividad para que la función se llame a si misma y evaluar las codiciones
        } else {
            listaNumerosSorteados.push(numeroGenerado);//Metodo push permite añadir un dato al fianl de la lisa
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() { //funcion para las concidiciones iniciales del juego y reinicio.
    asignarTextoElemento('h1','Juego del Número Secreto!');//Llamar función con delcaración de parametros
    asignarTextoElemento('p',`Indica un número del 01 al ${numeroMaximo}, por favor`);
    //....Generar el # aleatorio.
    numeroSecreto = generarNumeroSecreto();
    //....Inicializar el numero de intentos.
    intentos = 1; 
}

function reinicarJuego() { //se construye función para reinicar el juego con el boton nuevo juego
    //Se necesita Limpiar la caja.
    limpiarCaja();
    //....Indicar msm Intervalo de números.
    //....Generar el # aleatorio e Inicializar el numero de intentos.
    condicionesIniciales();  
    //....Deshabilitar el boton nuevo juego.
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    /*Funcion serAttribute permite colocar un atributo y espera 2 condiciones, el atributo
    y si su valor sera true o false, dependiendo de la necesidad del atributo añadido*/
}

condicionesIniciales();
