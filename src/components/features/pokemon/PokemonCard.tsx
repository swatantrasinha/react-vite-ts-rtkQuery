import { type Pokemon } from '../../../types/Pokemon'
import { useGetPokemonByUrlQuery } from '../../../redux/features/pokemonsSlice';
import {StyledHomePokemonCard} from './PokemonCard.style';

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
   
    if(rawData.isFetching) {
        return (<p>Loading Pokemon..</p>)
    } else if(rawData.isError) {
        return (<p>Some error </p>);
    }

    if(rawData.isSuccess) {
        const {data: {id, name, imageUrl}}= rawData;
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