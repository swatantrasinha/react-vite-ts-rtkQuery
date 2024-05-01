import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { genderOptions, typeOptions } from "../../constants/filterOptions";
import { filterAndStore } from "../../utils/filterAndStore-functions";

const initialState = {
    types: filterAndStore(typeOptions),
    gender: filterAndStore(genderOptions), 
    pokemonsList:[],
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
        savePokemonsToStore(state,action: PayloadAction<any>){
            if(state.pokemonsList.length === 20) {
                state.pokemonsList.length=0;
                state.pokemonsList.push(action.payload);
            } else {
                state.pokemonsList.push(action.payload);
            }
        }
    }
})

export const {changePokemonGenderOptions, changePokemonTypesOptions, savePokemonsToStore}= myReducer.actions;