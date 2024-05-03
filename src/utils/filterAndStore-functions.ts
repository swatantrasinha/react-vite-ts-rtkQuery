import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { PokemonData } from "../components/features/pokemon/PokemonCard";
type RequiredForEvolution= {
    name: string;
    url: string;
  }
  
  type Pokemon_Species= {
    pokemon_species: RequiredForEvolution
    rate: number;
  }
  
  type PokemonGenderRawDataType = {
    id: number;
    name: string;
    pokemon_species_details: Pokemon_Species[];
    required_for_evolution: RequiredForEvolution[];
  }

export const filterAndStore= (objArray: {label:string, value: string}[]) => {
    const result: string[]  = [];

    objArray.map(ele => {
        result.push(ele.value);
    })
    return result;
}

export const checkTypeFilters = (pokemon:PokemonData, typesFilters:string[]): boolean => {
    let flag:boolean= false;
     if(typesFilters.length ===6) {
        return true;
    } else {
        const pokemonTypes= Array.from(pokemon.types).map(ele => ele.type.name);    
        for (let i = 0; i < typesFilters.length; i++) {
            const typesFilter = typesFilters[i];
            if(pokemonTypes.includes(typesFilter)) {
                flag=true;
                break;
            }
        }
        return flag;
    }
}

export const checkGenderFilters = (pokemon:PokemonData, genderFilters:string[], pokemonsWithgenderData:any): boolean => {
    let flag:boolean= false;
     if(genderFilters.length === 3) {
        return true;
    } else {
        const pokemonName= pokemon.name;      
        for (let i = 0; i < genderFilters.length; i++) {
            const genderFilter= genderFilters[i];
            const storedGenderData= pokemonsWithgenderData[genderFilter];
            if(storedGenderData && storedGenderData.includes(pokemonName)) {
                flag= true;
                break;         
            }     
        }
        return flag;
    }
}

export const getPokemonNamesByGender = (pokemonsResult: { error?: undefined; data: (PokemonGenderRawDataType | unknown); meta?: FetchBaseQueryMeta | undefined; }) => {
    const pokemonsData = pokemonsResult.data as PokemonGenderRawDataType;
    const pokemonsArray  = Array.from(pokemonsData.pokemon_species_details);
    const pokemonsList= pokemonsArray.map(ele => ele.pokemon_species.name)
    return pokemonsList;
}