import { capitalize } from './globals-functions'
import TypeBadge from './typeBadge';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faRuler, faMars, faVenus, faM } from '@fortawesome/free-solid-svg-icons';

function PokemonCard({ pokemon }) {
    const [isShiny, setIsShiny] = useState(false);
    const [gender, setGender] = useState("male"); // "male" o "female"

    // Función que devuelve la URL correcta del sprite según sexo y shiny
    const getSprite = () => {
        if (gender === "female") {
            if (isShiny && pokemon.sprites.front_shiny_female) return pokemon.sprites.front_shiny_female;
            if (pokemon.sprites.front_female) return pokemon.sprites.front_female;
            // fallback si no tiene variante femenina
            return isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
        } else {
            // macho
            return isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
        }
    };

    return (
        <article key={pokemon.id} className={`cardType-${pokemon.types[0].type.name}`}>
            <div className="spriteButtons">
                <div className='genderContainer'>
                    {pokemon.sprites.front_default && (
                        <button className='maleButton' onClick={() => setGender("male")}><FontAwesomeIcon icon={faMars} /></button>
                    )}
                    {pokemon.sprites.front_female && (
                        <button className='femaleButton' onClick={() => setGender("female")}><FontAwesomeIcon icon={faVenus} /></button>
                    )}
                </div>

                <p><strong>#{pokemon.id.toString().padStart(3, "0")}</strong></p>

                <div>
                    {pokemon.sprites.front_shiny && (
                        <button className='shinyButton' onClick={() => setIsShiny((prev) => !prev)}>✨</button>
                    )}
                </div>
            </div>
            <img src={getSprite()} alt="Oops" />
            <h2>{capitalize(pokemon.name)}</h2>

            <div className='typesContainer'>
                {pokemon.types.map((t) => <TypeBadge key={t.type.name} type={t.type.name} />)}
            </div>

            <div className='alturaPeso'>
                <span>
                    <h4><strong>{pokemon.height / 10} M</strong></h4>
                    <p><FontAwesomeIcon icon={faRuler} /> Altura</p>
                </span>
                <span>
                    <h4><strong>{pokemon.weight / 10} KG</strong></h4>
                    <p><FontAwesomeIcon icon={faDumbbell} /> Peso</p>
                </span>
            </div>
        </article>
    )
}

export default PokemonCard