import {StyledHomePage} from './HomePage.style';
import { useGetPokemonsQuery } from '../../../redux/features/pokemonsSlice';
import PokemonList from '../../organisms/pokemon-list/PokemonList';
 
const HomePage = () => {
   
   const {isLoading, data} = useGetPokemonsQuery('pokemon');
  
  return (
    <StyledHomePage>
      <main>
        {isLoading && (<p>Loading....</p>)}
        {!isLoading && data?.results && (
          <PokemonList pokemonList={data.results} />
        )}
        
      </main>
   </StyledHomePage>
    
  )
}

export default HomePage

