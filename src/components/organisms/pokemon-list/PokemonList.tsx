import { type Pokemon } from '../../../types/Pokemon';
import PokemonCard, { type PokemonData } from '../../features/pokemon/PokemonCard';
import FilteredPokemons from './FilteredPokemons';

export type PokemonListProps = {
    pokemonList: Pokemon[] | PokemonData[] | null;
    isFilterApplied: boolean;
}
const PokemonList = ({pokemonList, isFilterApplied}: PokemonListProps) => {
  
  if(isFilterApplied) {
    return (
      <div className="grid-container">
        {pokemonList?.map((pokemon,index) => (
          <FilteredPokemons
            uniqueId={`pokemon-${index}`} 
            isFilterApplied={isFilterApplied}
            pokemon={pokemon}/>
          ))}
      </div>
    )
  }

  return (
           <div className="grid-container">            
            {!isFilterApplied && pokemonList?.map((pokemon,index) => {
              const uniqueKey= `pokemon-${index}`;
              const {name, url}= pokemon as Pokemon;
              if(name && url) {
                const pokemon= {
                  name,
                  url,
                  id: (index+1).toString()
                }
                return (
                    <div key={uniqueKey} className='pokemon'>
                      <PokemonCard  isFilterApplied={isFilterApplied} pokemonProperties={pokemon} />
                    </div>
                  )
              }
              return (
                <p>some error </p>
            )
            })} 

          </div>
  )
}

export default PokemonList