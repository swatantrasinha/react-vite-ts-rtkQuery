import PokemonCard, { PokemonData } from '../../features/pokemon/PokemonCard';
import { usePokemonDispatch, usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { checkGenderFilters, checkTypeFilters } from '../../../utils/filterAndStore-functions';
import { addFilteredPokemonsToStore, removeUnfilteredPokemonsFromStore } from '../../../redux/features/reducer';
import { Pokemon } from '../../../types/Pokemon';

type FilteredPokemonsPropsType ={ 
  uniqueId: string;
  pokemon: PokemonData | Pokemon; 
  isFilterApplied: boolean;
}
const FilteredPokemons = ({uniqueId, pokemon, isFilterApplied}: FilteredPokemonsPropsType) => {
    const dispatch = usePokemonDispatch(); 
    const genderFilters = usePokemonSelector((state) => state.filteringData.gender);
    const typesFilters = usePokemonSelector((state) => state.filteringData.types);

    const isTypesFilterPassed = checkTypeFilters(pokemon as PokemonData, typesFilters);

    const pokemonsInQueries = usePokemonSelector((state) => state.api.queries);
    const pokemonsWithgenderData = pokemonsInQueries['getPokemonsWithGender("")']?.data;
    const isGenderFilterPassed = checkGenderFilters(pokemon as PokemonData, genderFilters, pokemonsWithgenderData);
    // console.log('***** isGenderFilterPassed : ', isGenderFilterPassed);
    // console.log('typesFilters ', typesFilters);
    
    
    if(!isTypesFilterPassed || !isGenderFilterPassed) {
      dispatch(removeUnfilteredPokemonsFromStore(pokemon as PokemonData));
      return null;
    }
    dispatch(addFilteredPokemonsToStore(pokemon as PokemonData));
  
  return (
      <div key={uniqueId} className='pokemon'>
              <span>Fil App</span>
              <PokemonCard isFilterApplied={isFilterApplied} pokemonProperties={pokemon as PokemonData} />
      </div>
  )
}

export default FilteredPokemons;