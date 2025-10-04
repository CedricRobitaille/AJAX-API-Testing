const url = "https://pokeapi.co/api/v2/"

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")

let offset = 0;
let limit = 18;
let isLoading = false;



const errorNotification = (error) => {
  console.log(error)
  if (/404/.test(error)) {
    error = "Error: The Pokemon you're looking for does not exist."
  }

  const body = document.querySelector("body");
  const notification = document.createElement("p")
  notification.innerText = error;
  notification.classList.add("error")
  body.appendChild(notification);


  setTimeout(() => { // REMOVE THE NOTIF
    body.removeChild(notification);
  }, 7500);
}





const clearCards = () => {
  offset = 0;
  const resultContainer = document.getElementById("search-results");
  resultContainer.innerHTML = ""
}




/**
 * 
 * @param {object} data - Data from a 
 */
const displayData = async (data) => {

  const resultContainer = document.getElementById("search-results");
  data = await data; // Await the data so the func doesn't start without the fetched data
  // resultContainer.innerHTML = ""; // Wipes the container

  console.log(data);


  // Check if the data contains pokemon or not.
  if (data.id) {
    clearCards();
    makeCard(data)
  } else {
    // clearCards();
    let pokemonTotal = 0;
    for (const pokemon of data.results) {
      pokemonTotal++;
      const id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1);

      pokeData = await fetchData(`pokemon/${id}`);
      makeCard(pokeData);
    }
    offset += pokemonTotal
  }






  async function makeCard(pokeData) {
    // ===================================
    // MAKE PLACEHOLDERS
    // ===================================
    const placeholderCard = document.createElement("div")
    placeholderCard.classList.add("card", "placeholder")
    resultContainer.appendChild(placeholderCard);

    const id = pokeData.id


    // ===================================
    // START BUILDING CARDS
    // ===================================

    // console.log(pokemon)
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

    const sprite = document.createElement("img");
    sprite.setAttribute("src", pokeData.sprites.front_default);
    sprite.classList.add("sprite")
    card.appendChild(sprite)

    const pokeID = document.createElement("p");
    pokeID.classList.add("id-number");
    pokeID.innerText = `N\u00B0${id}`;
    card.appendChild(pokeID)

    const pokeName = document.createElement("h4");
    pokeName.classList.add("pokemon-name");
    pokeName.innerText = pokeData.name;
    card.appendChild(pokeName);

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("types");
    for (let types = 0; types < pokeData.types.length; types++) {
      const type = pokeData.types[types].type.name;
      const typeElem = document.createElement("p");
      typeElem.innerText = type;
      typeElem.classList.add(type);
      typeContainer.appendChild(typeElem);
    }
    card.appendChild(typeContainer)


    card.addEventListener("click", () => {

    })


    // ===================================
    // DELETE PLACEHOLDER
    // ===================================

    resultContainer.removeChild(placeholderCard);



    // ===================================
    // PLACE CARD
    // ===================================

    const nextPlaceholder = document.querySelector(".placeholder");
    resultContainer.insertBefore(card, nextPlaceholder);
  }
  limit = 6;
  isLoading = false;
}




/**
 * Grabs a data set from the API based on the URL parameters provided
 * @param {*} params 
 * @returns 
 */
const fetchData = async (params) => {
  isLoading = true;
  try {
    const response = await fetch(`${url}/${params}?limit=${limit}&offset=${offset}`) // Get the data

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status} (${response.statusText})`)
    }

    const data = await response.json(); // parse the data as json
    console.log("Fetched Data: ", data);
    return data;

  } catch (error) {
    isLoading = false;
    errorNotification(`"Fetch error:" ${error}`);
    // console.error("Fetch error:", error);
  }

}





const search = async () => {
  console.clear();
  if (searchInput.value) {
    console.log(`Searching for: ${searchInput.value}`)
    const pokemon = fetchData(`pokemon/${searchInput.value}`)

    if (await pokemon) {
      displayData(pokemon)
    }

  } else {
    console.log("No Value Detected")
    window.onload = displayData(fetchData("pokemon"));
  }

}



searchButton.addEventListener("click", () => {
  search();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search();
  }
});

window.addEventListener("scroll", () => {

  if (!isLoading) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      displayData(fetchData("pokemon"));
    }
  }


});


console.log(searchButton)
window.onload = displayData(fetchData("pokemon"));