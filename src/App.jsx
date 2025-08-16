import { useFetch } from './useFetch'
import './App.css'
import { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'


function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const { data, loading, error } = useFetch(url)
  const [details, setDetails] = useState([])

  // Cuando cambia la lista de Pokémon (results), cargamos sus detalles
  useEffect(() => {
    if (!data?.results) return

    // Consultamos cada URL en paralelo
    Promise.all(
      data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      )
    ).then((allDetails) => {
      setDetails(allDetails)
    })
  }, [data])

  return (
    <>
      <h1>CONSUMIR API POKEMON</h1>

      {loading && <h3>Cargando ...</h3>}
      {error && <h3>Error: {error}</h3>}

      {console.log(details)}

      <section className='card'>
        {details.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
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
