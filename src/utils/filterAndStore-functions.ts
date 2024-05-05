import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { PokemonData, PokemonGenderRawDataType } from "../types/Pokemon";
import {genderOptions, typeOptions} from '../constants/filterOptions'
import { STAT_RANGE, StatEnum } from "../types/stat-range-type";

export const filterAndStore= (objArray: {label:string, value: string}[]) => {
    const result: string[]  = [];

    objArray.map(ele => {
        result.push(ele.value);
    })
    return result;
}

export const checkTypeFilters = (pokemon:PokemonData, typesFilters:string[]): boolean => {
    let flag:boolean= false;
     if(typesFilters.length === typeOptions.length) {
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
     if(genderFilters.length === genderOptions.length) {
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
export const findPokemonGenderByName = (pokemonName: string,pokemonsWithgenderData:any ): (string[] | []) => {
    const result:string[]=[];
    const checkandAddIfGenderInList= (genderType: string) => {
        if(pokemonsWithgenderData[`${genderType}`].includes(pokemonName)) {
            result.push(genderType);
        }
    }
    checkandAddIfGenderInList('male');
    checkandAddIfGenderInList('female');
    checkandAddIfGenderInList('genderless');
    return result;
};

export const getPokemonNamesByGender = (pokemonsResult: { error?: undefined; data: (PokemonGenderRawDataType | unknown); meta?: FetchBaseQueryMeta | undefined; }) => {
    const pokemonsData = pokemonsResult.data as PokemonGenderRawDataType;
    const pokemonsArray  = Array.from(pokemonsData.pokemon_species_details);
    const pokemonsList= pokemonsArray.map(ele => ele.pokemon_species.name)
    return pokemonsList;
}

export const checkStatsFilters = (pokemon:PokemonData, statsFilter:STAT_RANGE): boolean => {    
    let result: boolean= true;
    if(!statsFilter) {
        return result;
    }
    for (let index = 0; index < pokemon.stats.length; index++) {
        const ele = pokemon.stats[index];
        const statType= ele.stat.name;
        const statValue= ele.base_stat;
        const minValue= statsFilter[`${statType}` as StatEnum].minValue;
        const maxValue= statsFilter[`${statType}` as StatEnum].maxValue;
        if((statValue < minValue) || (statValue > maxValue)) {
            result= false;
            break;
        }
    }
    return result;
}

