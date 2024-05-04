import {StyledPokemon} from './Pokemon.style';
import { type PokemonData, type PokemonPropsType } from '../../../types/Pokemon';
import { Link } from 'react-router-dom';

const Pokemon = (props: PokemonPropsType) => {
    const {name, imageUrl, id}= props.pokemonProperties as PokemonData;
    
    const generatePokemonId= (pokemonId: string) => {  
        if(pokemonId.length == 1) {
            return `00${pokemonId}`;
        }
        return `0${pokemonId}`;
    }
        
    return (
        <StyledPokemon>
        
        <Link to='/pokemon'>
            <div className='pokemon-card'>
            <div className='img-container'>
                <img className='pokemon-img' src={imageUrl} />
            </div>
            <div className='pokemon-name'> {name}</div>
            <div className='pokemon-index'>{generatePokemonId(id.toString())}</div>
            </div>
        </Link> 
    </StyledPokemon>
    )
}

export default Pokemon;