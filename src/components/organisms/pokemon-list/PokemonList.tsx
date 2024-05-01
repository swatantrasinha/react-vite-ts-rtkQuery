import React from 'react'
import { type Pokemon } from '../../../types/Pokemon';
import { useGetPokemonByUrlQuery } from '../../../redux/features/pokemonsSlice';
import PokemonCard from '../../features/pokemon/PokemonCard';

type PokemonRawDataType= {
    isError:boolean;
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    data: {
        id: number;
        sprites: {
            other: {
                dream_world: {
                    front_default: string
                }
            }
        }
    }
}

type PokemonListProps = {
    pokemonList: Pokemon[]
}
const PokemonList = ({pokemonList}: PokemonListProps) => {
    console.log('pokemonList : ', pokemonList);
  return (
           <div className="grid-container">
            
         {pokemonList?.map((pokemon,index) => {
              const uniqueKey= `pokemon-${index}`;
              const {name, url}= pokemon;
              if(name && url) {
                return (
                    <div key={uniqueKey} className='pokemon'>
                        <PokemonCard name={name} id={(index+1).toString()} url={url} />
                        {/* <h5>Name: {name}</h5> */}
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