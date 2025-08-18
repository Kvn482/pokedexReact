import './PokemonTypes.css'
import typeData from './Types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function TypeBadge({ type }) {
    const { icon, color } = typeData[type]

    return (
        <span className={`typeBadge typeBadge-${type}`} style={{ backgroundColor: color }}>
            <img src={icon} alt="" />
            <strong>{type.toUpperCase()}</strong>
        </span>
    )

}

function TypeButton({ type, onclick }) {

    if (type === "all") {
        return (
            <span className="typeButton typeButton-all" onClick={onclick} style={{fontSize: '20px'}}>
                <FontAwesomeIcon icon={faHome} />
            </span>
        );
    }

    const { icon, color } = typeData[type]

    return (
        <span className={`typeButton typeButton-${type}`} style={{ backgroundColor: color }} onClick={onclick}>
            <img src={icon} alt="" />
        </span>
    )
}

export { TypeBadge, TypeButton }
