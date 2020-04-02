//variables

const listaTweets = document.getElementById('lista-tweets');



//eventsListener

eventListeners();

function eventListeners() {
    document.getElementById('formulario').addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', borrarTweet);
    document.addEventListener('DOMContentLoad', localStorageReady);
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
        event.target.parentElement.remove();
		borrarTweetLS(event.target.parentElement.innerText);
    }
}
//funcion para cargar los tw desde LS
function localStorageReady() {
    let tweets;

    tweets = obtenerTweetsLS();
    tweets.forEach(function(tweet){
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
    })   
}
function agregaTweetLS(tweet){
    // console.log(tweet);
    let tweets;
    //llamo funcion para recuperar tw de LS
    tweets = obtenerTweetsLS();
    //inserto los tw en el array
    tweets.push(tweet);
    //convierto el string en array para LS
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}
//recupera tw de LS y los guarda en un array
function obtenerTweetsLS(){
    let tweets;
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else {
        tweets = JSON.parse(localStorage.getItem('tweets') )
    }
    return tweets;
}
//borra tw de LS
function borrarTweetLS(tweet) {
	let tweets, tweetBorrar;
	tweetBorrar = tweet.substring(0, tweet.length - 1);
	tweets = obtenerTweetsLS();
	tweets.forEach(function(tweet, index) {
		if(tweetBorrar === tweet) {
			tweets.splice(index, 1);
		}
	});
	localStorage.setItem('tweets', JSON.stringify(tweets));
}