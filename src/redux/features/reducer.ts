import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { genderOptions, typeOptions } from "../../constants/filterOptions";
import { filterAndStore } from "../../utils/filterAndStore-functions";

const initialState = {
    types: filterAndStore(typeOptions),
    gender: filterAndStore(genderOptions)    
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
        // addOptionsToFilteringData(state, action:PayloadAction<payload:string[]>){
        //     switch (action.type) {
        //         case 'pokemonType':{
        //             state.types.push({
        //                 ...state.gender,
        //                 action.payload
        //             })
        //             break;
        //         }
                    
        //         case 'pokemonGender':{
        //             state.gender.push({
        //                 ...state.types,
        //                 action.payload
        //             })
        //             break;
        //         }

        //         default: {
        //             break;
        //         }
        //     }
          
        // }, 
    }
})

export const {changePokemonGenderOptions, changePokemonTypesOptions}= myReducer.actions;