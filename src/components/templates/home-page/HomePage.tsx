import {StyledHomePage} from './HomePage.style';
import { useGetPokemonsQuery, useGetPokemonsWithGenderQuery } from '../../../redux/features/pokemonsSlice';
import PokemonList from '../../organisms/pokemon-list/PokemonList';
import { useEffect, useState } from 'react';
import { usePokemonSelector , usePokemonDispatch} from '../../../redux/features/pokemon-hook';
import { changePokemonGenderOptions, changePokemonTypesOptions } from '../../../redux/features/reducer';
import { POKEMON_GENDER_LIST, POKEMON_TYPES_LIST } from '../../../constants/filterTypes';
import { type HomePageProps, type PokemonsUrlType } from '../../../types/HomePage';



const HomePage = ({setResetFilters}: HomePageProps) => {

  
  const genderFilters = usePokemonSelector((state) => state.filteringData.gender);
  const typesFilters = usePokemonSelector((state) => state.filteringData.types);
  const statsFilters = usePokemonSelector((state) => state.filteringData.stats);
  const pokemonDataFromStore= usePokemonSelector((state) => state.filteringData.pokemonsList);
  const searchInputFilters = usePokemonSelector((state) => state.filteringData.searchValue);

 const dispatch= usePokemonDispatch();
  
  useEffect(() => {
    if(searchInputFilters || (genderFilters.length !== POKEMON_GENDER_LIST.length) || (typesFilters.length != POKEMON_TYPES_LIST.length || (statsFilters!=null))) {
      setIsFilterApplied(true);     
    } else {
      setIsFilterApplied(false);
    }
  }, [genderFilters, typesFilters, statsFilters, searchInputFilters]);
  
   
  const [fetchPokemonsUrl, setFetchPokemonsUrl] = useState<PokemonsUrlType>({previous:null, current:'', next: null});
  const [isFilterApplied, setIsFilterApplied]= useState<boolean>(false);
    
  const {isLoading, data} = useGetPokemonsQuery(`${fetchPokemonsUrl.current}`);

  useGetPokemonsWithGenderQuery('');

  const nextClickHandler = () => {   
    if(data && data.next) {
      const splitBySlashArray = data.next.split('/');
      commonActionForPreviousAndNext(splitBySlashArray); 
    }
  } 
  const previousClickHandler = () => {
    if(data && data.previous) {
      const splitBySlashArray = data.previous.split('/');
      commonActionForPreviousAndNext(splitBySlashArray);
    }
  }

  const commonActionForPreviousAndNext = (splitBySlashArray:string[]) => {
    const len= splitBySlashArray?.length;
    const additonalPartInUrl=  len && splitBySlashArray[len-1];
    setFetchPokemonsUrl(() => {
      return {...fetchPokemonsUrl, current: `${additonalPartInUrl}`}
    })
    if(isFilterApplied) {
      dispatch(changePokemonTypesOptions(POKEMON_TYPES_LIST));
      dispatch(changePokemonGenderOptions(POKEMON_GENDER_LIST));
      setResetFilters(true);
    }
  }

  return (
    <StyledHomePage>
      <div className="home-page">
        
        <main>
          {isLoading && (<p>Loading....</p>)}

          {!isLoading && data?.results && !isFilterApplied &&(
            <PokemonList isFilterApplied={isFilterApplied} pokemonList={data.results} setResetFilters={setResetFilters} />
          )}
          
          {isFilterApplied && (
            <PokemonList isFilterApplied={isFilterApplied} pokemonList={pokemonDataFromStore} setResetFilters={setResetFilters} />
          )} 
        </main>

        <footer>
            <div className='pokemon-pagination'>
              {data?.previous && (<button onClick={previousClickHandler}>Previous</button>)}
              {data?.next && (<button onClick={nextClickHandler}>Next</button>)}
          </div>
        </footer>
      </div>
   </StyledHomePage>
    
  )
}

export default HomePage

