import { useGetPokemonByUrlQuery } from '../../../redux/features/pokemonsSlice';
import {StyledHomePokemonCard} from './PokemonCard.style';
import { usePokemonDispatch, usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { savePokemonsToStore } from '../../../redux/features/reducer';


// type PokemonIdType= {id: string};
type PokemonPropsTypeWithoutFilter= {id: string; name: string; url: string};
type PokemonPropsType=  {
    isFilterApplied: boolean;
    pokemonProperties: PokemonPropsTypeWithoutFilter | PokemonData;
}


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
    if(props.isFilterApplied){
        const {name, imageUrl, id}= props.pokemonProperties as PokemonData;
        
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

    const{url}= props.pokemonProperties as PokemonPropsTypeWithoutFilter;
    const splitBySlashArray = url.split('/');
    const len= splitBySlashArray?.length;
    const pokemonId=  len && splitBySlashArray[len-2];
    const rawData: PokemonRawDataType = useGetPokemonByUrlQuery<PokemonRawDataType>(pokemonId.toString());
    const dispatch = usePokemonDispatch();
    const storedPokemons = usePokemonSelector<{id:string; name: string}[]>((state) => state.filteringData.pokemonsList);
 
    if(rawData.isFetching) {
        return (<p>Loading Pokemon..</p>)
    } else if(rawData.isError) {
        return (<p>Some error </p>);
    }

    if(rawData.isSuccess) {       
        const {data: {id, name, imageUrl, sprites, stats, types}}= rawData;
        if(storedPokemons.length ==0) {
            dispatch(savePokemonsToStore({id,name, imageUrl, sprites, stats, types}));
        } else {
            const isElementPresent= storedPokemons.find(ele => ele.id === id);
            if(!isElementPresent) {
                dispatch(savePokemonsToStore({id,name, imageUrl, sprites, stats, types}));
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