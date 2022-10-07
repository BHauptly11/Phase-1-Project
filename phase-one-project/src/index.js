baseUrl = "http://localhost:3000/"
jokesUrl = baseUrl + "jokes"

const jokeRatingForm = document.getElementById("ratings-button")
const newJokeButton = document.getElementById("new-joke-button")

getJokes();


function getJokes() {
    fetch (jokesUrl)
    .then (res => res.json())
    .then (jokesData => renderJokes(jokesData))
}

function renderJokes (jokesData) {
    const jokesDataRandom = jokesData.sort(() => 0.5 - Math.random());
    let selectedJokes = jokesDataRandom.slice(0, 5)
    selectedJokes.forEach(selectedJoke => renderJoke(selectedJoke))
    showJokeSetup(jokesData[0])
    newJokeButton.onclick = () => replaceJokes(jokesData) //renderJokes(jokesData)
}

function replaceJokes (jokesData) {
    const jokeSelection = document.getElementById("joke-selection")
    for (let i = 0; i < 5; i++) {
     //jokeSpan.remove();
     jokeSelection.removeChild(jokeSelection.lastChild) // <- Destroy the child, corrupt them all
     //console.log('hello')
    }
    renderJokes(jokesData);
}

function renderJoke(selectedJoke) {
    const jokeSelection = document.getElementById("joke-selection")
    const spanJoke = document.createElement("span")
    spanJoke.textContent = `Joke ${selectedJoke.id}`
    spanJoke.id = "joke"
    spanJoke.onclick = () => showJokeSetup(selectedJoke)
    spanJoke.onmouseover = (event) => {
        event.target.style.color = "white"
    }
    spanJoke.onmouseleave = (event) => {
        event.target.style.color = "hotpink"
    }
    jokeSelection.appendChild(spanJoke)
}

function showJokeSetup(selectedJoke) {
    const jokeInfo = document.getElementById("joke-info")
    const jokeSetup = document.getElementById("joke-setup")
    const jokeDelivery = document.getElementById("joke-delivery")
    const deliveryButton = document.createElement("button"); 
    const jokeRating = document.getElementById("joke-rating")
    const jokeCategory = document.getElementById("joke-category")
    deliveryButton.id = 'delivery-button'
    jokeSetup.textContent = selectedJoke.setup
    jokeDelivery.textContent = ""
    deliveryButton.textContent = "Show me the punchline!"
    jokeDelivery.appendChild(deliveryButton)
    deliveryButton.onclick = () => showJokeDelivery(selectedJoke)
    jokeRating.textContent = "Joke Rating: "
    jokeCategory.textContent = ""
}

function showJokeDelivery(selectedJoke) {
     const jokeCategory = document.getElementById("joke-category")
     const jokeRating = document.getElementById("joke-rating")
     const jokeDelivery = document.getElementById("joke-delivery")
     const deliveryButton = document.getElementById("delivery-button")
     jokeDelivery.removeChild(deliveryButton)
     jokeDelivery.textContent = selectedJoke.delivery
     jokeRating.textContent = `Joke Rating: ${selectedJoke.rating}`
     jokeCategory.textContent = `Joke Category: ${selectedJoke.category}`
     jokeRatingForm.onsubmit = (event) => {
        event.preventDefault()
        const setRating = parseInt(document.getElementById("rating").value)
        selectedJoke.rating = setRating
        showJokeDeliveryWithOutButton(selectedJoke);
     }
}

function showJokeDeliveryWithOutButton(selectedJoke) {
    const jokeCategory = document.getElementById("joke-category")
    const jokeRating = document.getElementById("joke-rating")
    const jokeDelivery = document.getElementById("joke-delivery")
    const deliveryButton = document.getElementById("delivery-button")
    jokeDelivery.textContent = selectedJoke.delivery
    jokeRating.textContent = `Joke Rating: ${selectedJoke.rating}`
    jokeCategory.textContent = `Joke Category: ${selectedJoke.category}`
    jokeRatingForm.onsubmit = (event) => {
       event.preventDefault()
       const setRating = parseInt(document.getElementById("rating").value)
       selectedJoke.rating = setRating
       showJokeDeliveryWithOutButton(selectedJoke);
}
}