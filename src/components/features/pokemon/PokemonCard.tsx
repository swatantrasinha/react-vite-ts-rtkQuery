import { type Pokemon } from '../../../types/Pokemon'
import { useGetPokemonByUrlQuery } from '../../../redux/features/pokemonsSlice';
import {StyledHomePokemonCard} from './PokemonCard.style';
import { usePokemonDispatch, usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { savePokemonsToStore } from '../../../redux/features/reducer';
import { useEffect } from 'react';

type PokemonIdType= {id: string};
type PokemonPropsType= Pokemon &  PokemonIdType;
type PokemonType= {
    slot: number;
    type: {
      name: string;
      url: string
    }
  }
  type PokemonStateType = {
    base_stat: number;
    effort: number;
    stat: {
        name: string,
        url: string 
      }
  };
  type PokemonSpritesType={
    other: {
        dream_world: {
            front_default: string
        }
    }
};
export type PokemonData= {
    id: string;
    name: string;
    imageUrl: string;
    stats: PokemonStateType[];
    types: PokemonType[];
    sprites: PokemonSpritesType;
}

export type PokemonRawDataType= {
    isError:boolean;
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    data: PokemonData;
}

const generatePokemonId= (pokemonId: string) => {  
    if(pokemonId.length == 1) {
        return `00${pokemonId}`;
    }
    return `0${pokemonId}`;
}

const PokemonCard = (props: PokemonPropsType) => {
    const{url}= props;
    const splitBySlashArray = url.split('/');
    const len= splitBySlashArray?.length;
    const pokemonId=  len && splitBySlashArray[len-2];
    const rawData: PokemonRawDataType = useGetPokemonByUrlQuery<PokemonRawDataType>(pokemonId.toString());
    const dispatch = usePokemonDispatch();
    const storedPokemons = usePokemonSelector((state) => state.filteringData.pokemonsList);
    const malePokemons = usePokemonSelector((state) => state.api.queries);
    console.log('malePokemons ', malePokemons);
    
    

    if(rawData.isFetching) {
        return (<p>Loading Pokemon..</p>)
    } else if(rawData.isError) {
        return (<p>Some error </p>);
    }

    if(rawData.isSuccess) {
        console.log('rawData ', rawData);
        
        const {data: {id, name, imageUrl}}= rawData;
        // console.log('storedPokemons ', storedPokemons);
        if(storedPokemons.length ==0) {
            dispatch(savePokemonsToStore({id,name}));
        } else {
            const isElementPresent= storedPokemons.find(ele => ele?.id === id);
            console.log('isElementPresent ', isElementPresent);
            if(!isElementPresent) {
                dispatch(savePokemonsToStore({id,name}));
            }
        } 

        return (
            <StyledHomePokemonCard>
                <div className='pokemon-card'>
                    <div className='img-container'>
                        <img className='pokemon-img' src={imageUrl} />
                    </div>
                    <div className='pokemon-name'> {name}</div>
                    <div className='pokemon-index'>{generatePokemonId(id.toString())}</div>
                </div> 
            </StyledHomePokemonCard>
          )
    }
    return null;
}

export default PokemonCard