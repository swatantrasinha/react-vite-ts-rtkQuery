import { type Pokemon } from '../../../types/Pokemon';
import PokemonCard from '../../features/pokemon/PokemonCard';


export type PokemonListProps = {
    pokemonList: Pokemon[] | null
}
const PokemonList = ({pokemonList}: PokemonListProps) => {
  
  return (
           <div className="grid-container">
            
         {pokemonList?.map((pokemon,index) => {
              const uniqueKey= `pokemon-${index}`;
              const {name, url}= pokemon;
              if(name && url) {
                return (
                    <div key={uniqueKey} className='pokemon'>
                        <PokemonCard name={name} id={(index+1).toString()} url={url} />
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