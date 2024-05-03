import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { genderOptions, typeOptions } from "../../constants/filterOptions";
import { filterAndStore } from "../../utils/filterAndStore-functions";
import { type PokemonData } from "../../components/features/pokemon/PokemonCard";

type InitialStateType ={
    types: string[];
    gender: string[];
    pokemonsList: PokemonData[] | [];
    filteredPokemonsList: PokemonData[] | [];
}
const initialState:InitialStateType = {
    types: filterAndStore(typeOptions),
    gender: filterAndStore(genderOptions), 
    pokemonsList: [],
    filteredPokemonsList:[]
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
        },
        addFilteredPokemonsToStore(state,action: PayloadAction<PokemonData>){
            if(state.filteredPokemonsList.length === 0) {
                state.filteredPokemonsList= [...state.filteredPokemonsList, action.payload];
            } else {
                let isElementPresent:boolean = false;
                for (let i = 0; i < [...state.filteredPokemonsList].length; i++) {
                    const element = [...state.filteredPokemonsList][i];
                    if(element.id === action.payload.id) {
                        isElementPresent= true;
                        break;
                    }
                }
                if(!isElementPresent) {
                    state.filteredPokemonsList= [...state.filteredPokemonsList, action.payload];
                }
            }
        },
        removeUnfilteredPokemonsFromStore(state,action: PayloadAction<PokemonData>){

            if(state.filteredPokemonsList.length === 0) {
               return;
            } else {
                const newArray = [...state.filteredPokemonsList].filter(ele => ele.id !== action.payload.id);
                state.filteredPokemonsList = newArray;
                // for (let i = 0; i < [...state.filteredPokemonsList].length; i++) {
                //     const element = [...state.filteredPokemonsList][i];
                //     if(element.id === action.payload.id) {
                //         const newArray = [...state.filteredPokemonsList];

                //         break;
                //     }
                // }
            }
        }
    }
})

export const {changePokemonGenderOptions, changePokemonTypesOptions, savePokemonsToStore, addFilteredPokemonsToStore, removeUnfilteredPokemonsFromStore}= myReducer.actions;