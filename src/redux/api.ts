import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RawDataPokemons } from '../types/Pokemon';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({
         baseUrl: 'https://pokeapi.co/api/v2/' 
    }),
    tagTypes: ["pokemons"],
    endpoints: (builder) => ({
    getAllPokemons : builder.query<RawDataPokemons, string>({
        query: (endpoint) => `${endpoint}`,
        providesTags:["pokemons"]
      }),
    
    getPokemonById: builder.query<unknown, number>({
        query: (pokemonId) => `pokemon/${pokemonId}`,
    }),
    }),
   

});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPokemonsQuery, useGetPokemonByIdQuery} = pokemonApi;