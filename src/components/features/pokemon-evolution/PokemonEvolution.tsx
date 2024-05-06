
import { useGetPokemonEvolutionQuery } from '../../../redux/features/pokemonsSlice';
import Pokemon from '../../molecules/pokemon/Pokemon';
import { StyledHomePokemonEvolution } from './PokemonEvolution.style';
import rightArrowBoldIcon from "/icons/right-arrow-bold-icon.svg";


type PokemonEvolutionPropsType= {
    id: string;
}
const PokemonEvolution = ({id}:PokemonEvolutionPropsType ) => {
  
    const {isLoading, data} = useGetPokemonEvolutionQuery(`${id}`);
       
    if(isLoading) {
      return (<p>Loading Pokemon Evolution...</p>)
    } else if (data) {
       const {evolution1Details, evolution2Details, evolution3Details} = data;
  
      
        return (
          <StyledHomePokemonEvolution>
            <div className='evolution-chain'>
            <h1 className='evolution-heading'>Evolution Heading</h1>
            <div className="evolution-cards my-8 flex justify-around">
              {evolution1Details && (
                <div className='evolution-card'>
                  <Pokemon pokemonProperties={{
                    name:evolution1Details.name,
                    id:evolution1Details.id,
                    imageUrl:evolution1Details.imageUrl,
                  }} />
                  </div>
              )}
          {evolution2Details && (
            <div className='evolution-card flex'>
                <img src={rightArrowBoldIcon} alt="right arrow bold icon showing evolution changes" />
            </div>
          )}
              {evolution2Details && (
                  <div className='evolution-card'>
                    <Pokemon pokemonProperties={{
                      name:evolution2Details.name,
                      id:evolution2Details.id,
                      imageUrl:evolution2Details.imageUrl,
                    }} />
                  </div>
              )}
              {evolution3Details && (
            <div className='evolution-card flex'>
                <img src={rightArrowBoldIcon} alt="right arrow bold icon showing evolution changes" />
            </div>
          )}

                  {evolution3Details && (
                  <div className='evolution-card'>
                    <Pokemon pokemonProperties={{
                      name:evolution3Details.name,
                      id:evolution3Details.id,
                      imageUrl:evolution3Details.imageUrl,
                    }} />
                  </div>
              )}


            </div>
          </div>
        </StyledHomePokemonEvolution>
      )}
  return null;
}

export default PokemonEvolution