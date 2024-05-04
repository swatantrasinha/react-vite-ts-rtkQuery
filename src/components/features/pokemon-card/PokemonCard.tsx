import { useGetPokemonByUrlQuery } from '../../../redux/features/pokemonsSlice';
import { usePokemonDispatch, usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { savePokemonsToStore } from '../../../redux/features/reducer';
import { PokemonCardPropsType, PokemonRawDataType } from '../../../types/Pokemon';
import Pokemon from '../../molecules/pokemon/Pokemon';

const PokemonCard = (props: PokemonCardPropsType) => {    
    const{url}= props.pokemonProperties;
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
        const pokemonData = {
            id,
            name,
            imageUrl,
        }
        return (
            <Pokemon pokemonProperties={pokemonData} />
          )
    }
    return null;
}

export default PokemonCard