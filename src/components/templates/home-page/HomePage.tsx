import {StyledHomePage} from './HomePage.style';
import { useGetPokemonsQuery, useGetPokemonsWithGenderQuery } from '../../../redux/features/pokemonsSlice';
import PokemonList from '../../organisms/pokemon-list/PokemonList';
import { useState } from 'react';



 type PokemonsUrlType= {
  previous: string | null;
  next: string | null;
  current: string;
 }
const HomePage = () => {
  console.log('homepage');

  
  
  const [fetchPokemonsUrl, setFetchPokemonsUrl] = useState<PokemonsUrlType>({previous:null, current:'', next: null});
  console.log('end-point : ', `${fetchPokemonsUrl.current}`);
  
  const {isLoading, data} = useGetPokemonsQuery(`${fetchPokemonsUrl.current}`);
  const {data : genderData }= useGetPokemonsWithGenderQuery('');
  console.log('fetched data : ', data);
  console.log('genderData ', genderData);
  
    
  const nextClickHandler = () => {
    if(data && data.next) {
      const splitBySlashArray = data.next.split('/');
      const len= splitBySlashArray?.length;
      const additonalPartInUrl=  len && splitBySlashArray[len-1];

      setFetchPokemonsUrl(() => {
        return {...fetchPokemonsUrl, current: `${additonalPartInUrl}`}
      })
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
    }
  }

  

  return (
    <StyledHomePage>
      <main>
        {isLoading && (<p>Loading....</p>)}
        {!isLoading && data?.results && (
          <PokemonList pokemonList={data.results} />
        )}
      </main>

      <footer>
          <div className='pokemon-pagination'>
            {data?.previous && (<button onClick={previousClickHandler}>Previous</button>)}
            {data?.next && (<button onClick={nextClickHandler}>Next</button>)}
        </div>
      </footer>
   </StyledHomePage>
    
  )
}

export default HomePage

