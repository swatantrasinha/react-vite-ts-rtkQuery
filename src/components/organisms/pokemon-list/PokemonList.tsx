import { PokemonListProps, type PokemonBasicData } from '../../../types/Pokemon';
import PokemonCard from '../../features/pokemon-card/PokemonCard';
import FilteredPokemons from './FilteredPokemons';

const PokemonList = ({pokemonList, isFilterApplied, setResetFilters}: PokemonListProps) => {
  
  if(isFilterApplied) {
    return (
      <div className="grid-container">
        {pokemonList?.map((pokemon,index) => (
          <FilteredPokemons
            uniqueId={`pokemon-${index}`} 
            isFilterApplied={isFilterApplied}
            pokemon={pokemon}
            setResetFilters={setResetFilters}
            />
          ))}
      </div>
    )
  }

  return (
           <div className="grid-container">            
            {!isFilterApplied && pokemonList?.map((pokemon,index) => {
              const uniqueKey= `pokemon-${index}`;
              const {name, url}= pokemon as PokemonBasicData;
              if(name && url) {
                const pokemon= {
                  name,
                  url,
                  id: (index+1).toString()
                }
                return (
                    <div key={uniqueKey} className='pokemon'>
                      <PokemonCard  pokemonProperties={pokemon} />
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