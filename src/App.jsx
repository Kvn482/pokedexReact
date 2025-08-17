import { useFetch } from './useFetch'
import './App.css'
import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'


function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const { data, loading, error } = useFetch(url)
  const [details, setDetails] = useState([])
  const [buscar, setBuscar] = useState('')

  useEffect(() => {

    if (!data) return;

    if (data.results) {
      Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      ).then((allDetails) => {
        setDetails(allDetails);
      });
    } else {
      setDetails([data]);
    }
  }, [data])

  const createHandleSearchPokemon = (pokemon) => (e) => {
    e.preventDefault()
    setUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
  }

  return (
    <>
      <h1>POKEDEX</h1>
      <form>
        <input type="text" className='addProductInput' placeholder='Buscar...' value={buscar} onChange={(e) => setBuscar(e.target.value)} />
        <button className='addProductBtn' onClick={createHandleSearchPokemon(buscar)}>Buscar</button>
      </form>

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
