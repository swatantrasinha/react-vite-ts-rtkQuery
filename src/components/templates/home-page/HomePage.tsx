import {StyledHomePage} from './HomePage.style';
import { useGetPokemonsQuery, useGetPokemonsWithGenderQuery } from '../../../redux/features/pokemonsSlice';
import PokemonList from '../../organisms/pokemon-list/PokemonList';
import { useEffect, useState } from 'react';
import { usePokemonSelector , usePokemonDispatch} from '../../../redux/features/pokemon-hook';
import { changePokemonGenderOptions, changePokemonTypesOptions } from '../../../redux/features/reducer';
import { POKEMON_GENDER_LIST, POKEMON_TYPES_LIST } from '../../../constants/filterTypes';

 type PokemonsUrlType= {
  previous: string | null;
  next: string | null;
  current: string;
 }
const HomePage = () => {

  
  const genderFilters = usePokemonSelector((state) => state.filteringData.gender);
  const typesFilters = usePokemonSelector((state) => state.filteringData.types);
  const pokemonDataFromStore= usePokemonSelector((state) => state.filteringData.pokemonsList);
  // const [isNextBtnClickWithFilterApplied, setIsNextBtnClickWithFilterApplied] = useState<boolean>(false);
 const dispatch= usePokemonDispatch();
  
  useEffect(() => {
    if((genderFilters.length !== 3) || (typesFilters.length !=6)) {
      setIsFilterApplied(true);     
    } else {
      setIsFilterApplied(false);
    }
    
  }, [genderFilters, typesFilters])
  
   
  const [fetchPokemonsUrl, setFetchPokemonsUrl] = useState<PokemonsUrlType>({previous:null, current:'', next: null});
  const [isFilterApplied, setIsFilterApplied]= useState<boolean>(false);
    
  const {isLoading, data} = useGetPokemonsQuery(`${fetchPokemonsUrl.current}`);
//   const {data : genderData }= useGetPokemonsWithGenderQuery('');
useGetPokemonsWithGenderQuery('');
  
    
  const nextClickHandler = () => {
    if(data && data.next) {
      const splitBySlashArray = data.next.split('/');
      const len= splitBySlashArray?.length;
      const additonalPartInUrl=  len && splitBySlashArray[len-1];

      setFetchPokemonsUrl(() => {
        return {...fetchPokemonsUrl, current: `${additonalPartInUrl}`}
      })
    }
    if(isFilterApplied) {
      dispatch(changePokemonTypesOptions(POKEMON_TYPES_LIST));
      dispatch(changePokemonGenderOptions(POKEMON_GENDER_LIST));
    }
  } 
  const previousClickHandler = () => {
    if(data && data.previous) {
      const splitBySlashArray = data.previous.split('/');
      const len= splitBySlashArray?.length;
      const additonalPartInUrl=  len && splitBySlashArray[len-1];

      setFetchPokemonsUrl(() => {
        return {...fetchPokemonsUrl, current: `${additonalPartInUrl}`}
      })

      if(isFilterApplied) {
        dispatch(changePokemonTypesOptions(POKEMON_TYPES_LIST));
        dispatch(changePokemonGenderOptions(POKEMON_GENDER_LIST));
      }
    }
  }

  return (
    <StyledHomePage>
      <div className="home-page">
        <main>
          {/* {(!isFilterApplied ) ? (<h1>Hellow</h1>): (<h1>Byee</h1>)} */}

          {isLoading && (<p>Loading....</p>)}
          {!isLoading && data?.results && !isFilterApplied &&(
            <PokemonList isFilterApplied={isFilterApplied} pokemonList={data.results} />
          )}
          
          {isFilterApplied && (
          <PokemonList isFilterApplied={isFilterApplied}  pokemonList={pokemonDataFromStore} />
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

