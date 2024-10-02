window.addEventListener('load', init);

//Globals
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
let pokemonData = {};
let gallery;
let dialog;
let dialogContent;

/**
 * Initialize after the DOM is ready
 */
function init() {
    const toggleNavButton = document.getElementById('toggle-nav');
    const nav = document.getElementById('region-nav');

    toggleNavButton.addEventListener('click', () => {
        nav.classList.toggle('hidden');
    });

    // Add event listeners to each region link to hide the navbar upon selection
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.add('hidden'); // Hide the navbar
        });
    });

    gallery = document.getElementById('pokemon-gallery');
    gallery.addEventListener("click", pokemonClickHandler);

    dialog = document.getElementById('pokemon-detail');
    dialogContent = document.getElementById('modal-content');
    const dialogExit = document.getElementById('modal-close');
    dialogExit.addEventListener('click', dialogCloseHandler);

    getData(apiUrl, succesHandler);
}

function getData(url, succesFunction) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(succesFunction)
        .catch(errorHandler)
}

function succesHandler(data) {
    let johtoStartAdded = false;
    let hoennStartAdded = false;
    let sinnohStartAdded = false;
    let unovaStartAdded = false;
    let kalosStartAdded = false;
    let alolaStartAdded = false;
    let galarStartAdded = false;
    let hisuiStartAdded = false;
    let paldeaStartAdded = false;

    for (const pokemon of data.results) {
        // Get Pokémon ID from the URL
        const pokemonId = parseInt(pokemon.url.split('/').slice(-2)[0]);

        // Exclude Pokémon from #10001 to #10090
        if ((pokemonId >= 10001 && pokemonId <= 10090) || (pokemonId == 10093) || (pokemonId >= 10094 && pokemonId <= 10099) || (pokemonId >= 10116 && pokemonId <= 10125) || (pokemonId >= 10127 && pokemonId <= 10151) || (pokemonId >= 10153 && pokemonId <= 10160)) {
            continue; // Skip this iteration if the Pokémon ID is in the excluded ranges
        }

        let newDiv = document.createElement('div');
        newDiv.classList.add('pokemon-card');
        newDiv.dataset.name = pokemon.name;
        gallery.appendChild(newDiv);

        // Kanto regio (0-151)
        if (!johtoStartAdded && pokemon.url.includes('/151/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);
        
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container');
            regionContainer.id = 'johto';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);
        
            let johtoImage = document.createElement('img');
            johtoImage.src = './img/johto.png';
            johtoImage.alt = "Johto Region";
            johtoImage.classList.add('region-image');
            regionContainer.appendChild(johtoImage);
        
            johtoStartAdded = true;
        }

        // Johto regio (152-251)
        if (!hoennStartAdded && pokemon.url.includes('/251/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'hoenn';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Hoenn afbeelding toe
            let hoennImage = document.createElement('img');
            hoennImage.src = './img/hoenn.png'; // Zorg ervoor dat je het juiste pad gebruikt
            hoennImage.alt = "Hoenn Region"; // Alt-tekst voor de afbeelding
            hoennImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(hoennImage);

            hoennStartAdded = true;
        }

        // Sinnoh regio (386-493)
        if (!sinnohStartAdded && pokemon.url.includes('/386/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'sinnoh';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Sinnoh afbeelding toe
            let sinnohImage = document.createElement('img');
            sinnohImage.src = './img/sinnoh.png'; // Zorg ervoor dat je het juiste pad gebruikt
            sinnohImage.alt = "Sinnoh Region"; // Alt-tekst voor de afbeelding
            sinnohImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(sinnohImage);

            sinnohStartAdded = true;
        }

        // Unova regio (494-649)
        if (!unovaStartAdded && pokemon.url.includes('/493/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'unova';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Unova afbeelding toe
            let unovaImage = document.createElement('img');
            unovaImage.src = './img/unova.png'; // Zorg ervoor dat je het juiste pad gebruikt
            unovaImage.alt = "Unova Region"; // Alt-tekst voor de afbeelding
            unovaImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(unovaImage);

            unovaStartAdded = true;
        }

        // Kalos regio (650-721)
        if (!kalosStartAdded && pokemon.url.includes('/649/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'kalos';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Kalos afbeelding toe
            let kalosImage = document.createElement('img');
            kalosImage.src = './img/kalos.png'; // Zorg ervoor dat je het juiste pad gebruikt
            kalosImage.alt = "Kalos Region"; // Alt-tekst voor de afbeelding
            kalosImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(kalosImage);

            kalosStartAdded = true;
        }

        // Alola regio (722-809)
        if (!alolaStartAdded && pokemon.url.includes('/721/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'alola';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Alola afbeelding toe
            let alolaImage = document.createElement('img');
            alolaImage.src = './img/alola.png'; // Zorg ervoor dat je het juiste pad gebruikt
            alolaImage.alt = "Alola Region"; // Alt-tekst voor de afbeelding
            alolaImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(alolaImage);

            alolaStartAdded = true;
        }

        // Galar regio (810-898)
        if (!galarStartAdded && pokemon.url.includes('/809/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'galar';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Galar afbeelding toe
            let galarImage = document.createElement('img');
            galarImage.src = './img/galar.png'; // Zorg ervoor dat je het juiste pad gebruikt
            galarImage.alt = "Galar Region"; // Alt-tekst voor de afbeelding
            galarImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(galarImage);

            galarStartAdded = true;
        }

        // Hisui regio (899-905)
        if (!hisuiStartAdded && pokemon.url.includes('/898/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'hisui';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Hisui afbeelding toe
            let hisuiImage = document.createElement('img');
            hisuiImage.src = './img/hisui.jpg'; // Zorg ervoor dat je het juiste pad gebruikt
            hisuiImage.alt = "Hisui Region"; // Alt-tekst voor de afbeelding
            hisuiImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(hisuiImage);

            // Voeg de regio naam toe in een overlay
            let regionName = document.createElement('div');
            regionName.classList.add('region-name-hisui'); // Voeg een klasse toe voor styling
            regionName.innerText = 'Hisui'; // Zet de naam van de regio in de balk
            regionContainer.appendChild(regionName);

            hisuiStartAdded = true;
        }

        // Paldea regio (906+)
        if (!paldeaStartAdded && pokemon.url.includes('/905/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'paldea';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Paldea afbeelding toe
            let paldeaImage = document.createElement('img');
            paldeaImage.src = './img/paldea.jpg'; // Zorg ervoor dat je het juiste pad gebruikt
            paldeaImage.alt = "Paldea Region"; // Alt-tekst voor de afbeelding
            paldeaImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(paldeaImage);

            // Voeg de regio naam toe in een overlay
            let regionName = document.createElement('div');
            regionName.classList.add('region-name-paldea'); // Voeg een klasse toe voor styling
            regionName.innerText = 'Paldea'; // Zet de naam van de regio in de balk
            regionContainer.appendChild(regionName);

            paldeaStartAdded = true;
        }

        // Pokémon details ophalen
        getData(pokemon.url, pokemonSuccesHandler);
    }
}

function pokemonSuccesHandler(apiData) {
    let div = document.querySelector(`.pokemon-card[data-name='${apiData.name}']`);

    let title = document.createElement('h2');
    title.innerText = `${apiData.name} (#${apiData.id})`;
    div.appendChild(title);

    let image = document.createElement('img');
    // Hier veranderen we de normale sprite naar de shiny sprite
    image.src = apiData.sprites.other.home.front_shiny;
    div.appendChild(image);

    let button = document.createElement('button');
    button.innerText = "Show shiny✨"; // Dit kun je nu eventueel weghalen
    button.dataset.id = apiData.id;
    div.appendChild(button);
}

function pokemonClickHandler(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    let pokemon = pokemonData[e.target.dataset.id];
    console.log(pokemon);

    dialog.showModal();

    dialogContent.innerHTML = "";

    let title = document.createElement('h1');
    title.innerText = `${pokemon.name} (#${pokemon.id})`;
    dialogContent.appendChild(title);

    let image = document.createElement('img');
    image.src = pokemon.sprites.other.home.front_shiny;
    dialogContent.appendChild(image)
}

function dialogCloseHandler() {
    dialog.close();
}

function errorHandler(data) {
    console.log(data)
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerText = 'Er is helaas iets fout gegaan met de API, probeer het later opnieuw'
}