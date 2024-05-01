import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type RawDataPokemons } from '../../types/Pokemon';
import { type PokemonData } from '../../components/features/pokemon/PokemonCard';


export const pokemonsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<RawDataPokemons , string>({
        query: (endpoint) => `${endpoint}`,
    }),

    getPokemonByUrl: builder.query<PokemonData, string> ({
        query: (pokemonId) => `pokemon/${pokemonId}/`,
          transformResponse: (response: PokemonData) => {            
          const formattedResponse= {
            id: response.id, 
            name: response.name,
            imageUrl: response.sprites.other.dream_world.front_default,
            stats: response.stats,
            types: response.types,
            sprites: response.sprites
          };
          return formattedResponse;
        },

        }),
    })
});

export const { useGetPokemonsQuery, useGetPokemonByUrlQuery } = pokemonsApi ;