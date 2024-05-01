import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { genderOptions, typeOptions } from "../../constants/filterOptions";
import { filterAndStore } from "../../utils/filterAndStore-functions";
import { type PokemonData } from "../../components/features/pokemon/PokemonCard";

type InitialStateType ={
    types: string[];
    gender: string[];
    pokemonsList: PokemonData[] | [];
}
const initialState:InitialStateType = {
    types: filterAndStore(typeOptions),
    gender: filterAndStore(genderOptions), 
    pokemonsList: []
}


export const myReducer= createSlice({
    name: 'filteringData',
    initialState,
    reducers:{
        changePokemonGenderOptions(state, action){
                state.gender=action.payload
        },
        changePokemonTypesOptions(state, action:PayloadAction<string[]>){
            state.types=action.payload
        },
        savePokemonsToStore(state,action: PayloadAction<PokemonData>){
            if(state.pokemonsList.length === 20) {
                state.pokemonsList.length=0;
                state.pokemonsList.push(action.payload);
            } else {
                // state.pokemonsList.push(action.payload);
                state.pokemonsList= [...state.pokemonsList, action.payload];
            }
        }
    }
})

export const {changePokemonGenderOptions, changePokemonTypesOptions, savePokemonsToStore}= myReducer.actions;