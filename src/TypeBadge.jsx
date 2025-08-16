import './TypeBadge.css'

function TypeBadge({ type }) {
    const typeIcons = {
        bug: "/icons/bug.svg",
        dark: "/icons/dark.svg",
        dragon: "/icons/dragon.svg",
        electric: "/icons/electric.svg",
        fairy: "/icons/fairy.svg",
        fighting: "/icons/fighting.svg",
        fire: "/icons/fire.svg",
        flying: "/icons/flying.svg",
        ghost: "/icons/ghost.svg",
        grass: "/icons/grass.svg",
        ground: "/icons/ground.svg",
        ice: "/icons/ice.svg",
        normal: "/icons/normal.svg",
        poison: "/icons/poison.svg",
        psychic: "/icons/psychic.svg",
        rock: "/icons/rock.svg",
        steel: "/icons/steel.svg",
        water: "/icons/water.svg",
    };

    return (
        <span className={`typeBadge typeBadge-${type}`}>
            <img src={typeIcons[type]} alt="" />
            <strong>{type.toUpperCase()}</strong>
        </span>
    )

}

export default TypeBadge
