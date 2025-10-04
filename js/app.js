const url = "https://pokeapi.co/api/v2/"












/**
 * 
 * @param {object} data - Data from a 
 */
const displayData = async (data) => {
  const resultContainer = document.getElementById("search-results");
  data = await data; // Await the data so the func doesn't start without the fetched data
  // resultContainer.innerHTML = ""; // Wipes the container

  // ===================================
  // MAKE PLACEHOLDERS
  // ===================================

  resultContainer.innerHTML = ""
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
  const response = await fetch(`${url}/${params}`) // Get the data
  const data = await response.json(); // parse the data as json

  console.log("Fetched Data: ", data);
  return data;

}


window.onload = displayData(fetchData("pokemon"))