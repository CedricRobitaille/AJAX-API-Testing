const url = "https://pokeapi.co/api/v2/"

const searchButton = document.getElementById("search-button")




const errorNotification = (error) => {

  const body = document.querySelector("body");
  const notification = document.createElement("p")
  notification.innerText = error;
  notification.classList.add("error")
  body.appendChild(notification);


  setTimeout(() => { // REMOVE THE NOTIF
    body.removeChild(notification);
  }, 7500);
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

  if (data.id) {
    makeCard()
  } else {
    for (const pokemon of data.results) {
      const id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1);
      console.log(id)

      pokeData = await fetchData(`pokemon/${id}`);
    }
  }






  function makeCard(pokeData) {
    

  }

  // ===================================
  // MAKE PLACEHOLDERS
  // ===================================

  for (const pokemon of data.results) {
    const placeholderCard = document.createElement("div")
    placeholderCard.classList.add("card", "placeholder")
    resultContainer.appendChild(placeholderCard)
  }



  // ===================================
  // GENERATE CARDS
  // ===================================
  for (const pokemon of data.results) {
    const id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1);
    console.log(id)

    pokeData = await fetchData(`pokemon/${id}`)
    console.log(pokeData)
    



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

    const placeholderCard = document.querySelector(".placeholder");
    resultContainer.removeChild(placeholderCard);



    // ===================================
    // PLACE CARD
    // ===================================

    const nextPlaceholder = document.querySelector(".placeholder");
    resultContainer.insertBefore(card, nextPlaceholder);
    
  }
}




/**
 * 
 * @param {*} params 
 * @returns 
 */
const fetchData = async (params) => {
  try {
    const response = await fetch(`${url}/${params}`) // Get the data
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status} (${response.statusText})`)
    }

    const data = await response.json(); // parse the data as json
    console.log("Fetched Data: ", data);
    return data;

  } catch (error) {
    errorNotification(error);
    console.error("Fetch error:", error);
  }
}





const search = () => {
  const searchInput = document.getElementById("search-input")

  if (searchInput.value) {
    console.clear();
    console.log(`Searching for: ${searchInput.value}`)

    const pokemon = fetchData(`pokemon/${searchInput.value}`)
    displayData(pokemon)

  } else {
    console.clear();
    console.log("No Value Detected")
  }
  
}



searchButton.addEventListener("click", () => {
  search();
});
console.log(searchButton)
window.onload = displayData(fetchData("pokemon"));