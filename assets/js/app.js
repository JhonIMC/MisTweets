// Variables
const listaTweets = document.getElementById("lista-tweets");

// Event Listeners
eventListeners();
function eventListeners(){
    // Cuando se envia el Formulario
    document.querySelector("#formulario").addEventListener("submit", agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener("click", borrarTweet);

    // Contenido Cargado (HTML)
    document.addEventListener("DOMContentLoaded", localStorageListo);
}

// Funciones
// Añadir Tweet del Formulario
function agregarTweet(e){
    e.preventDefault();

    // Leer el Valor del TextArea
    const tweet = document.getElementById("tweet").value;

    // Crear Boton de Elimnar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // Crear Elemento y Añadir el Contenido a la Lista
    const li = document.createElement("li");
    li.innerText = tweet;
    // Añade el Boton de Borrar al Tweet
    li.appendChild(botonBorrar);
    // Añade el Tweet a la Lista
    listaTweets.appendChild(li);

    // Añadir al Local Storage
    agregarTweetLocalStorage(tweet);

    // Borrar Tweet del TextArea
    document.getElementById("tweet").value = "";    

}

// Eliminar el Tweet en el DOM
function borrarTweet(e){
    e.preventDefault();
    if (e.target.className === "borrar-tweet") {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);        
    }
}

// Mostrar Datos del Local Storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(tweet => {
    // Crear Boton de Elimnar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // Crear Elemento y Añadir el Contenido a la Lista
    const li = document.createElement("li");
    li.innerText = tweet;
    // Añade el Boton de Borrar al Tweet
    li.appendChild(botonBorrar);
    // Añade el Tweet a la Lista
    listaTweets.appendChild(li);
    });
}

// Agregar el Tweet al Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // Añadir el Nuevo Tweet 
    tweets.push(tweet);

    // Convertir de String a Arreglo para el Local Storage
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprueba que haya Elementos en el Local Storage, Retorna un Arreglo
function obtenerTweetsLocalStorage(){
    let tweets;

    // Revisamos los Valores del Local Storage
    if (localStorage.getItem("tweets") === null) {
        tweets = [];
    } else{
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }
    return tweets;
}

// Eliminar el Tweet del Local Storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach((tweet, index) => {
       if (tweetBorrar === tweet) {
           tweets.splice(index, 1);
       }
    });
    localStorage.setItem("tweets", JSON.stringify(tweets));
}