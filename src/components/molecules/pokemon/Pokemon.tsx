import {StyledPokemon} from './Pokemon.style';
import { type PokemonData, type PokemonPropsType } from '../../../types/Pokemon';
import { Link } from 'react-router-dom';
import { generatePokemonId } from '../../../utils/string-manipulation';

const Pokemon = (props: PokemonPropsType) => {
    const {name, imageUrl, id, weight, height, pokemonGender}= props.pokemonProperties as PokemonData;
//    debugger;

    const pokemonDataForDetailsPage = { name,imageUrl, weight, height, pokemonGender };
    return (
        <StyledPokemon>
        <Link 
            to={`/pokemon/${id}`}
            state={pokemonDataForDetailsPage}
        >
            <div className='pokemon-card'>
            <div className='img-container'>
                <img className='pokemon-img' src={imageUrl} alt={`Pokemon with name : ${{name}}`} />
            </div>
            <div className='pokemon-name'> {name}</div>
            <div className='pokemon-index'>{generatePokemonId(id.toString())}</div>
            </div>
        </Link> 
    </StyledPokemon>
    )
}

export default Pokemon;