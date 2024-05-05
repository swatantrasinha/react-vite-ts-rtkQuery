import { useGetPokemonByUrlQuery } from '../../../redux/features/pokemonsSlice';
import { usePokemonDispatch, usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { savePokemonsToStore } from '../../../redux/features/reducer';
import { PokemonCardPropsType, PokemonRawDataType } from '../../../types/Pokemon';
import Pokemon from '../../molecules/pokemon/Pokemon';
import { findPokemonGenderByName } from '../../../utils/filterAndStore-functions';

const PokemonCard = (props: PokemonCardPropsType) => {    
    const{url}= props.pokemonProperties;
    const splitBySlashArray = url.split('/');
    const len= splitBySlashArray?.length;
    const pokemonId=  len && splitBySlashArray[len-2];
    const rawData: PokemonRawDataType = useGetPokemonByUrlQuery<PokemonRawDataType>(pokemonId.toString());
    const dispatch = usePokemonDispatch();
    const storedPokemons = usePokemonSelector<{id:string; name: string}[]>((state) => state.filteringData.pokemonsList);
    const pokemonsInQueries = usePokemonSelector((state) => state.api.queries);
    const pokemonsWithgenderData = pokemonsInQueries['getPokemonsWithGender("")']?.data;

 
    if(rawData.isFetching) {
        return (<p>Loading Pokemon..</p>)
    } else if(rawData.isError) {
        return (<p>Some error </p>);
    }

    if(rawData.isSuccess && pokemonsWithgenderData) {       
        const {data: {id, name, imageUrl, sprites, stats, types, weight, height, abilities}}= rawData;
        
        
        
        const pokemonGender  =  findPokemonGenderByName(name,pokemonsWithgenderData) || [];
        
        if(storedPokemons.length ==0) {
            dispatch(savePokemonsToStore({id,name, imageUrl, sprites, stats, types, weight, height, abilities, pokemonGender}));
        } else {
            const isElementPresent= storedPokemons.find(ele => ele.id === id);
            if(!isElementPresent) {
                dispatch(savePokemonsToStore({id,name, imageUrl, sprites, stats, types, weight, height, abilities, pokemonGender}));
            }
        } 
        
        const pokemonData = {
            id,
            name,
            imageUrl,
            weight, 
            height,
            abilities,
            pokemonGender,
            stats,
        }
        
        
        return (
            <Pokemon pokemonProperties={pokemonData} />
          )
    }
    return null;
}

export default PokemonCard