window.addEventListener('load', init);

//Globals
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
let pokemonData = {};
let gallery;
let dialog;
let dialogContent;
let selectedPokemonIds = [];

/**
 * Initialize after the DOM is ready
 */
function init() {
    const toggleNavButton = document.getElementById('toggle-nav');
    const nav = document.getElementById('region-nav');

    if (toggleNavButton) {
        toggleNavButton.addEventListener('click', () => {
            if (nav) {
                nav.classList.toggle('hidden');
            }
        });
    }

    // Add event listeners to each region link to hide the navbar upon selection
    if (nav) {
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.add('hidden'); // Hide the navbar
            });
        });
    }

    gallery = document.getElementById('pokemon-gallery');
    if (gallery) {
        gallery.addEventListener("click", pokemonClickHandler);
    }

    dialog = document.getElementById('pokemon-detail');
    dialogContent = document.getElementById('modal-content');
    const dialogExit = document.getElementById('modal-close');
    if (dialogExit) {
        dialogExit.addEventListener('click', dialogCloseHandler);
    }

    // Haal de opgeslagen selectie op uit localStorage
    const storedSelectedPokemon = localStorage.getItem('selectedPokemon');
    if (storedSelectedPokemon) {
        selectedPokemonIds = JSON.parse(storedSelectedPokemon);
    }

    updateKantoCounter();
    updateJohtoCounter();
    updateHoennCounter();
    updateSinnohCounter();
    updateUnovaCounter();
    updateKalosCounter();
    updateAlolaCounter();
    updateGalarCounter();
    updateHisuiCounter();
    updatePaldeaCounter();
    updateRegionalFormsCounter();

    updateTitle();
    updateShinydexTitle();
    getData(apiUrl, succesHandler);
}

function updateTitle() {
    const selectedCount = selectedPokemonIds.length;

    // Stel lastId in op 1081
    const lastId = 1081;

    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        if (mainTitle instanceof HTMLElement) {
            const percentage = ((selectedCount / lastId) * 100).toFixed(2); // Percentage berekenen en afronden op 2 decimalen
            mainTitle.innerText = `✨ Shinydex ${selectedCount}/${lastId} (${percentage}%)✨`;
        }
    }
}


function updateShinydexTitle() {
    const selectedCount = selectedPokemonIds.length;
    const totalPokemon = 1081; // Total number of Pokémon
    const titleElement = document.getElementById('shinydex-title');
    const selectedCountElement = document.getElementById('selected-count');

    if (titleElement && selectedCountElement) {
        selectedCountElement.innerText = selectedCount.toString(); // Update the count
        titleElement.innerText = `Shinydex ${selectedCount}/${totalPokemon}`; // Update the title
    }
}

function saveToLocalStorage() {
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemonIds));
    updateShinydexTitle(); // Update the title whenever saving to localStorage
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

// Functie om de counter bij te werken
function updateKantoCounter() {
    const kantoCounter = document.querySelector('.kanto-counter');
    if (!kantoCounter) return; // Voorkom null-referentie

    const kantoCount = selectedPokemonIds.filter(id => id >= 1 && id <= 151).length;
    const totalKanto = 151;
    const percentage = ((kantoCount / totalKanto) * 100).toFixed(2);
    const counterText = `Kanto ${kantoCount}/${totalKanto} (${percentage}%)`;

    if (kantoCounter instanceof HTMLElement) {
        kantoCounter.innerText = counterText; // Update de counter in de DOM
    }

    localStorage.setItem('kantoCounter', counterText);
}

function updateJohtoCounter() {
    const johtoCounter = document.querySelector('.johto-counter');
    if (!johtoCounter) return; // Voorkom null-referentie

    const johtoCount = selectedPokemonIds.filter(id => id >= 152 && id <= 251).length;
    const totalJohto = 100;
    const percentage = ((johtoCount / totalJohto) * 100).toFixed(2);
    const counterText = `Johto ${johtoCount}/${totalJohto} (${percentage}%)`;

    if (johtoCounter instanceof HTMLElement) {
        johtoCounter.innerText = counterText; // Update de counter in de DOM
    }

    localStorage.setItem('johtoCounter', counterText);
}

function updateHoennCounter() {
    const hoennCounter = document.querySelector('.hoenn-counter');
    if (!hoennCounter) return;

    const hoennCount = selectedPokemonIds.filter(id => id >= 252 && id <= 386).length;
    const totalHoenn = 135;
    const percentage = ((hoennCount / totalHoenn) * 100).toFixed(2);
    const counterText = `Hoenn ${hoennCount}/${totalHoenn} (${percentage}%)`;

    if (hoennCounter instanceof HTMLElement) {
        hoennCounter.innerText = counterText;
    }
    localStorage.setItem('hoennCounter', counterText);
}

function updateSinnohCounter() {
    const sinnohCounter = document.querySelector('.sinnoh-counter');
    if (!sinnohCounter) return;

    const sinnohCount = selectedPokemonIds.filter(id => id >= 387 && id <= 493).length;
    const totalSinnoh = 107;
    const percentage = ((sinnohCount / totalSinnoh) * 100).toFixed(2);
    const counterText = `Sinnoh ${sinnohCount}/${totalSinnoh} (${percentage}%)`;

    if (sinnohCounter instanceof HTMLElement) {
        sinnohCounter.innerText = counterText;
    }
    localStorage.setItem('sinnohCounter', counterText);
}

function updateUnovaCounter() {
    const unovaCounter = document.querySelector('.unova-counter');
    if (!unovaCounter) return;

    const unovaCount = selectedPokemonIds.filter(id => id >= 494 && id <= 649).length;
    const totalUnova = 156;
    const percentage = ((unovaCount / totalUnova) * 100).toFixed(2);
    const counterText = `Unova ${unovaCount}/${totalUnova} (${percentage}%)`;

    if (unovaCounter instanceof HTMLElement) {
        unovaCounter.innerText = counterText;
    }
    localStorage.setItem('unovaCounter', counterText);
}

function updateKalosCounter() {
    const kalosCounter = document.querySelector('.kalos-counter');
    if (!kalosCounter) return;

    const kalosCount = selectedPokemonIds.filter(id => id >= 650 && id <= 721).length;
    const totalKalos = 72;
    const percentage = ((kalosCount / totalKalos) * 100).toFixed(2);
    const counterText = `Kalos ${kalosCount}/${totalKalos} (${percentage}%)`;

    if (kalosCounter instanceof HTMLElement) {
        kalosCounter.innerText = counterText;
    }
    localStorage.setItem('kalosCounter', counterText);
}

function updateAlolaCounter() {
    const alolaCounter = document.querySelector('.alola-counter');
    if (!alolaCounter) return;

    const alolaCount = selectedPokemonIds.filter(id => id >= 722 && id <= 809).length;
    const totalAlola = 88;
    const percentage = ((alolaCount / totalAlola) * 100).toFixed(2);
    const counterText = `Alola ${alolaCount}/${totalAlola} (${percentage}%)`;

    if (alolaCounter instanceof HTMLElement) {
        alolaCounter.innerText = counterText;
    }
    localStorage.setItem('alolaCounter', counterText);
}

function updateGalarCounter() {
    const galarCounter = document.querySelector('.galar-counter');
    if (!galarCounter) return;

    const galarCount = selectedPokemonIds.filter(id => id >= 810 && id <= 898).length;
    const totalGalar = 89;
    const percentage = ((galarCount / totalGalar) * 100).toFixed(2);
    const counterText = `Galar ${galarCount}/${totalGalar} (${percentage}%)`;

    if (galarCounter instanceof HTMLElement) {
        galarCounter.innerText = counterText;
    }
    localStorage.setItem('galarCounter', counterText);
}

function updateHisuiCounter() {
    const hisuiCounter = document.querySelector('.hisui-counter');
    if (!hisuiCounter) return;

    const hisuiCount = selectedPokemonIds.filter(id => id >= 899 && id <= 905).length;
    const totalHisui = 7;
    const percentage = ((hisuiCount / totalHisui) * 100).toFixed(2);
    const counterText = `Hisui ${hisuiCount}/${totalHisui} (${percentage}%)`;

    if (hisuiCounter instanceof HTMLElement) {
        hisuiCounter.innerText = counterText;
    }
    localStorage.setItem('hisuiCounter', counterText);
}

function updatePaldeaCounter() {
    const paldeaCounter = document.querySelector('.paldea-counter');
    if (!paldeaCounter) return;

    const paldeaCount = selectedPokemonIds.filter(id => id >= 906 && id <= 1025).length;
    const totalPaldea = 119; // Pas aan indien nodig
    const percentage = ((paldeaCount / totalPaldea) * 100).toFixed(2);
    const counterText = `Paldea ${paldeaCount}/${totalPaldea} (${percentage}%)`;

    if (paldeaCounter instanceof HTMLElement) {
        paldeaCounter.innerText = counterText;
    }
    localStorage.setItem('paldeaCounter', counterText);
}

function updateRegionalFormsCounter() {
    const regionalFormsCounter = document.querySelector('.regional-forms-counter');
    if (!regionalFormsCounter) return;

    const regionalFormsCount = selectedPokemonIds.filter(id => id >= 10091 && id <= 10253).length;
    const totalRegionalForms = 56; // Pas aan indien nodig
    const percentage = ((regionalFormsCount / totalRegionalForms) * 100).toFixed(2);
    const counterText = `Regional forms ${regionalFormsCount}/${totalRegionalForms} (${percentage}%)`;

    if (regionalFormsCounter instanceof HTMLElement) {
        regionalFormsCounter.innerText = counterText;
    }
    localStorage.setItem('regionalFormsCounter', counterText);
}

function succesHandler(data) {
    let kantoStartAdded = false;
    let johtoStartAdded = false;
    let hoennStartAdded = false;
    let sinnohStartAdded = false;
    let unovaStartAdded = false;
    let kalosStartAdded = false;
    let alolaStartAdded = false;
    let galarStartAdded = false;
    let hisuiStartAdded = false;
    let paldeaStartAdded = false;
    let regionalFormsStartAdded = false;

    for (const pokemon of data.results) {
        // Get Pokémon ID from the URL
        const pokemonId = parseInt(pokemon.url.split('/').slice(-2)[0]);

        // Exclude Pokémon from #10001 to #10090
        if ((pokemonId >= 10001 && pokemonId <= 10090) || (pokemonId == 10093) || (pokemonId >= 10094 && pokemonId <= 10099) || (pokemonId >= 10116 && pokemonId <= 10160) || (pokemonId === 10178) || (pokemonId >= 10181 && pokemonId <= 10228) || (pokemonId >= 10245 && pokemonId <= 10246) || (pokemonId >= 10248 && pokemonId <= 10249) || (pokemonId >= 10251 && pokemonId <= 10252) || (pokemonId >= 10254 && pokemonId <= 10277)) {
            continue; // Skip this iteration if the Pokémon ID is in the excluded ranges
        }

        if (!kantoStartAdded && pokemon.url.includes('/1/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container');
            regionContainer.id = 'kanto'; // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de afbeelding toe
            let kantoImage = document.createElement('img');
            kantoImage.src = './img/kanto.png'; // Zorg ervoor dat je het juiste pad gebruikt
            kantoImage.alt = "Kanto Region";
            kantoImage.classList.add('region-image');
            regionContainer.appendChild(kantoImage);

            // Voeg hier de Kanto counter toe onder het break-element
            let kantoCounter = document.createElement('div');
            kantoCounter.classList.add('kanto-counter');
            kantoCounter.innerText = "0/151"; // Begin met een score van 0
            breakElement.appendChild(kantoCounter); // Voeg de counter toe aan het breakElement

            kantoStartAdded = true; // Markeer dat Kanto is toegevoegd
        }

        // Kanto regio (0-151)
        if (!johtoStartAdded && pokemon.url.includes('/152/')) {
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

            let johtoCounter = document.createElement('div');
            johtoCounter.classList.add('johto-counter');
            johtoCounter.innerText = "0/100"; // Begin met een score van 0
            breakElement.appendChild(johtoCounter); // Voeg de counter toe aan het breakElement

            johtoStartAdded = true;
        }

        // Johto regio (152-251)
        if (!hoennStartAdded && pokemon.url.includes('/252/')) {
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

            let hoennCounter = document.createElement('div');
            hoennCounter.classList.add('hoenn-counter');
            hoennCounter.innerText = "0/135"; // Begin met een score van 0
            breakElement.appendChild(hoennCounter); // Voeg de counter toe aan het breakElement

            hoennStartAdded = true;
        }

        // Sinnoh regio (386-493)
        if (!sinnohStartAdded && pokemon.url.includes('/387/')) {
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

            let sinnohCounter = document.createElement('div');
            sinnohCounter.classList.add('sinnoh-counter');
            sinnohCounter.innerText = "0/107"; // Begin met een score van 0
            breakElement.appendChild(sinnohCounter); // Voeg de counter toe aan het breakElement

            sinnohStartAdded = true;
        }

        // Unova regio (494-649)
        if (!unovaStartAdded && pokemon.url.includes('/494/')) {
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

            let unovaCounter = document.createElement('div');
            unovaCounter.classList.add('unova-counter');
            unovaCounter.innerText = "0/156"; // Begin met een score van 0
            breakElement.appendChild(unovaCounter); // Voeg de counter toe aan het breakElement

            unovaStartAdded = true;
        }

        // Kalos regio (650-721)
        if (!kalosStartAdded && pokemon.url.includes('/650/')) {
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

            let kalosCounter = document.createElement('div');
            kalosCounter.classList.add('kalos-counter');
            kalosCounter.innerText = "0/72"; // Begin met een score van 0
            breakElement.appendChild(kalosCounter); // Voeg de counter toe aan het breakElement

            kalosStartAdded = true;
        }

        // Alola regio (722-809)
        if (pokemonId === 722 && !alolaStartAdded) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container');
            regionContainer.id = 'alola';
            gallery.appendChild(regionContainer);

            let alolaImage = document.createElement('img');
            alolaImage.src = './img/alola.png';
            alolaImage.alt = "Alola Region";
            alolaImage.classList.add('region-image');
            regionContainer.appendChild(alolaImage);

            let alolaCounter = document.createElement('div');
            alolaCounter.classList.add('alola-counter');
            alolaCounter.innerText = "0/88"; // Begin met een score van 0
            breakElement.appendChild(alolaCounter); // Voeg de counter toe aan het breakElement

            alolaStartAdded = true;
        }

        // Galar regio (810-898)
        if (!galarStartAdded && pokemon.url.includes('/810/')) {
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

            let galarCounter = document.createElement('div');
            galarCounter.classList.add('galar-counter');
            galarCounter.innerText = "0/96"; // Begin met een score van 0
            breakElement.appendChild(galarCounter); // Voeg de counter toe aan het breakElement

            galarStartAdded = true;
        }

        // Hisui regio (899-905)
        if (!hisuiStartAdded && pokemon.url.includes('/899/')) {
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

            let hisuiCounter = document.createElement('div');
            hisuiCounter.classList.add('hisui-counter');
            hisuiCounter.innerText = "0/7"; // Begin met een score van 0
            breakElement.appendChild(hisuiCounter); // Voeg de counter toe aan het breakElement

            hisuiStartAdded = true;
        }

        // Paldea regio (906+)
        if (!paldeaStartAdded && pokemon.url.includes('/906/')) {
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

            let paldeaCounter = document.createElement('div');
            paldeaCounter.classList.add('paldea-counter');
            paldeaCounter.innerText = "0/119"; // Begin met een score van 0
            breakElement.appendChild(paldeaCounter); // Voeg de counter toe aan het breakElement

            paldeaStartAdded = true;
        }

        if (!regionalFormsStartAdded && pokemon.url.includes('/10091/')) {
            let breakElement = document.createElement('div');
            breakElement.classList.add('region-break');
            gallery.appendChild(breakElement);

            // Maak een container voor de afbeelding en de naam
            let regionContainer = document.createElement('div');
            regionContainer.classList.add('region-container'); // Voeg een klasse toe voor styling
            regionContainer.id = 'regional forms';  // Voeg dit ID toe
            gallery.appendChild(regionContainer);

            // Voeg de Paldea afbeelding toe
            let regionalFormsImage = document.createElement('img');
            regionalFormsImage.src = './img/regionals.jpg'; // Zorg ervoor dat je het juiste pad gebruikt
            regionalFormsImage.alt = "Regional forms"; // Alt-tekst voor de afbeelding
            regionalFormsImage.classList.add('region-image'); // Voeg een klasse toe voor styling
            regionContainer.appendChild(regionalFormsImage);

            // Voeg de regio naam toe in een overlay
            let regionName = document.createElement('div');
            regionName.classList.add('region-name-regionals'); // Voeg een klasse toe voor styling
            regionName.innerText = 'Regional Forms'; // Zet de naam van de regio in de balk
            regionContainer.appendChild(regionName);

            let regionalFormsCounter = document.createElement('div');
            regionalFormsCounter.classList.add('regional-forms-counter');
            regionalFormsCounter.innerText = "0/56"; // Begin met een score van 0
            breakElement.appendChild(regionalFormsCounter); // Voeg de counter toe aan het breakElement

            regionalFormsStartAdded = true;
        }

        let newDiv = document.createElement('div');
        newDiv.classList.add('pokemon-card');
        newDiv.dataset.name = pokemon.name;
        gallery.appendChild(newDiv);

        // Pokémon details ophalen

        getData(pokemon.url, pokemonSuccesHandler);
    }
    updateKantoCounter();
    updateJohtoCounter();
    updateHoennCounter();
    updateSinnohCounter();
    updateUnovaCounter();
    updateKalosCounter();
    updateAlolaCounter();
    updateGalarCounter();
    updateHisuiCounter();
    updatePaldeaCounter();
    updateRegionalFormsCounter();
}

function pokemonSuccesHandler(apiData) {
    pokemonData[apiData.id] = apiData;

    let div = document.querySelector(`.pokemon-card[data-name='${apiData.name}']`);

    let title = document.createElement('h2');
    title.innerText = `${apiData.name} (#${apiData.id})`;
    if (div) {
        div.appendChild(title);
    }

    let image = document.createElement('img');
    image.src = apiData.sprites.other.home.front_shiny;
    if (div) {
        div.appendChild(image);
    }

    let button = document.createElement('button');
    button.dataset.id = apiData.id;

    // Check if this Pokémon was previously selected and apply the gold border, gold name, and red button text
    if (selectedPokemonIds.includes(apiData.id)) {
        if (div) {
            if (div instanceof HTMLElement) {
                div.style.border = '5px solid gold'; // Restore gold border for previously selected Pokémon
            }
        }
        button.innerText = "Delete shiny"; // Set button text to "Delete shiny"
        button.style.color = 'red'; // Set button text color to red
        title.style.color = 'gold'; // Set Pokémon name color to gold
    } else {
        button.innerText = "GOTCHA"; // Default button text
        button.style.color = ''; // Reset button text color to default
        title.style.color = ''; // Reset Pokémon name color to default
    }

    if (div) {
        div.appendChild(button);
    }
}

function pokemonClickHandler(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    const clickedCard = e.target.closest('.pokemon-card');
    const pokemonId = parseInt(e.target.dataset.id);
    const pokemonTitle = clickedCard.querySelector('h2');

    // Toggle the border, name color, and button text
    if (clickedCard.style.border === '5px solid gold') {
        clickedCard.style.border = '5px solid white'; // Remove gold border
        pokemonTitle.style.color = ''; // Reset Pokémon name color to default
        selectedPokemonIds = selectedPokemonIds.filter(id => id !== pokemonId); // Remove ID from selected list
        e.target.innerText = 'GOTCHA'; // Change button text back to 'GOTCHA'
        e.target.style.color = ''; // Reset button text color to default
    } else {
        clickedCard.style.border = '5px solid gold'; // Set gold border
        pokemonTitle.style.color = 'gold'; // Set Pokémon name color to gold
        selectedPokemonIds.push(pokemonId); // Add ID to selected list
        e.target.innerText = 'Delete shiny'; // Change button text to 'Delete shiny'
        e.target.style.color = 'red'; // Change button text color to red
    }

    // Save updated selection to localStorage
    saveToLocalStorage();

    // Update the title and counters after saving
    updateTitle();
    updateKantoCounter();
    updateJohtoCounter(); // Zorg dat de Johto counter ook wordt bijgewerkt
    updateHoennCounter();
    updateSinnohCounter();
    updateUnovaCounter();
    updateKalosCounter();
    updateAlolaCounter();
    updateGalarCounter();
    updateHisuiCounter();
    updatePaldeaCounter();
    updateRegionalFormsCounter();
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