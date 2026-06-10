const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokemonType = document.querySelector('.pokemon_types');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        }

        return await response.json();
    } catch (error) {
        return null;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';

    try {
        const data = await fetchPokemon(pokemon);

        if (data) {
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            pokemonType.innerHTML = data.types[0].type.name;
            pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            input.value = '';
            searchPokemon = data.id;
        } else {
            pokemonImage.style.display = 'none';
            pokemonName.innerHTML = 'Não encontrado';
            pokemonNumber.innerHTML = '';
        }
    } catch (error) {
        pokemonName.innerHTML = 'Erro';
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
