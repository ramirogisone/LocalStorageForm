//variables

const listaTweets = document.getElementById('lista-tweets');



//eventsListener

eventListeners();

function eventListeners() {
    document.getElementById('formulario').addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', borrarTweet);
}

//Functions
//Enviar tweet al formulario
function agregarTweet(event) {
    event.preventDefault();
    //recupero lo escrito en el textArea con value
    const tweet = document.getElementById('tweet').value;
    //boton para borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    //creo un elemento y añado lo recuperado a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //agrega boton de borrar
    li.appendChild(botonBorrar);   
    //agrega el tweet a la lista
    listaTweets.appendChild(li);    
    //agregar el Tweet al local storage
    agregaTweetLS(tweet);
}

function borrarTweet(event) {
    event.preventDefault();
    if(event.target.className === 'borrar-tweet'){
        console.log(event.target.parentElement.remove() );
        alert('Tweet eliminado');
    }
}

function agregaTweetLS(){
    let tweets;
    //llamo funcion para recuperar tw de LS
    tweets = obtenerTweetsLS();
    //inserto los tw en el array
    tweets.push(tweet);
    //convierto el string en array para LS
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function obtenerTweetsLS(){
    let tweets;
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else {
        tweets = JSON.parse(localStorage.getItem('tweets') )
    }
    return tweets;
}