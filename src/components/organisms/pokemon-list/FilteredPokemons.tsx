
import { usePokemonDispatch, usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { checkGenderFilters, checkStatsFilters, checkTypeFilters } from '../../../utils/filterAndStore-functions';
import { addFilteredPokemonsToStore, removeUnfilteredPokemonsFromStore } from '../../../redux/features/reducer';
import { FilteredPokemonsPropsType, PokemonData } from '../../../types/Pokemon';
import Pokemon from '../../molecules/pokemon/Pokemon';
import { STAT_RANGE } from '../../../types/stat-range-type';


const FilteredPokemons = ({uniqueId, pokemon, setResetFilters}: FilteredPokemonsPropsType) => {
    const dispatch = usePokemonDispatch(); 
    const genderFilters = usePokemonSelector((state) => state.filteringData.gender);
    const typesFilters = usePokemonSelector((state) => state.filteringData.types);
    const statsFilters = usePokemonSelector((state) => state.filteringData.stats);
    const searchInputFilters = usePokemonSelector((state) => state.filteringData.searchValue);

    const isTypesFilterPassed = checkTypeFilters(pokemon as PokemonData, typesFilters);

    const pokemonsInQueries = usePokemonSelector((state) => state.api.queries);
    const pokemonsWithgenderData = pokemonsInQueries['getPokemonsWithGender("")']?.data;
    const isGenderFilterPassed = checkGenderFilters(pokemon as PokemonData, genderFilters, pokemonsWithgenderData);
    const isStatsFilterPassed= checkStatsFilters(pokemon as PokemonData, statsFilters as STAT_RANGE);
    
    const searchPokemonByNameAndId = (pokemon: PokemonData) : boolean => {
      if((pokemon.name.toLowerCase() === searchInputFilters?.toLowerCase()) || (pokemon.id.toString() === searchInputFilters)) {
        dispatch(addFilteredPokemonsToStore(pokemon as PokemonData));
        setResetFilters(true);
        return true;
      } else {
        dispatch(removeUnfilteredPokemonsFromStore(pokemon as PokemonData));
        return false;
      }
    }

    if(searchInputFilters) { // if filtering is by search 
      const isPokemonFound= searchPokemonByNameAndId(pokemon as PokemonData);
      if(!isPokemonFound) {
        return null;
      }
    } else {
      if(!isTypesFilterPassed || !isGenderFilterPassed || !isStatsFilterPassed) {
        dispatch(removeUnfilteredPokemonsFromStore(pokemon as PokemonData));
        return null;
      }
      dispatch(addFilteredPokemonsToStore(pokemon as PokemonData));
    }

   
  
  return (
      <div key={uniqueId} className='pokemon'>
              <Pokemon pokemonProperties={pokemon as PokemonData} />
      </div>
  )
}

export default FilteredPokemons;