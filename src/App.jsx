import { useFetch } from './useFetch'
import './App.css'
import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { TypeButton } from './PokemonTypes';
import typeData from './Types';


function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const { data, loading, error } = useFetch(url)
  const [details, setDetails] = useState([])
  const [buscar, setBuscar] = useState('')

  useEffect(() => {
    if (!data) return;

    let pokemonsArray = [];

    if (data.results) {
      pokemonsArray = data.results;
    } else if (data.pokemon) {
      pokemonsArray = data.pokemon.map(p => p.pokemon);
    } else {
      setDetails([data]);
      return;
    }

    Promise.all(pokemonsArray.map(p => fetch(p.url).then(res => res.json())))
      .then(allDetails => setDetails(allDetails))
      .catch(err => console.error(err));
  }, [data]);

  const createHandleSearchPokemon = (pokemon) => (e) => {
    e.preventDefault()
    setUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
  }

  const createHandleSearchTypePokemon = (type) => () => {

    if (type === 'all') {
      setUrl(`https://pokeapi.co/api/v2/pokemon`)
      return
    }

    setUrl(`https://pokeapi.co/api/v2/type/${type}`)
  }

  return (
    <>
      <header>
        <h1>POKEDEX</h1>
        <img src="/assets/pokeball_icon.png" alt="" />
      </header>
      
      <div className='filter-container'>
        <div className='pokemon-types-filter-container'>
          <TypeButton type="all" onclick={createHandleSearchTypePokemon('all')} />
          {Object.keys(typeData).map(type => (
            <TypeButton key={type} type={type} onclick={createHandleSearchTypePokemon(type)} />
          ))}
        </div>
        <div className='input-container'>
          <form>
            <input type="text" className='pokemon-search-input' placeholder='Buscar...' value={buscar} onChange={(e) => setBuscar(e.target.value)} />
            <button className='pokemon-search-button' onClick={createHandleSearchPokemon(buscar)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </form>
        </div>
      </div>

      {loading && <h3>Cargando ...</h3>}
      {error && <h3>Error: {error}</h3>}

      <section className='card'>
        {data ? (
          <div className='cardsWrapper'>
            {
              details.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))
            }
          </div>

        ) : (
          <h4>Todos tus pokemon quedaron debilitados. UnU</h4>
        )}
      </section>

      <div style={{ marginTop: "20px" }}>
        {data?.previous && (
          <button onClick={() => setUrl(data.previous)}>Anterior</button>
        )}

        {data?.next && (
          <button onClick={() => setUrl(data.next)}>Siguiente</button>
        )}
      </div>
    </>
  )
}

export default App
