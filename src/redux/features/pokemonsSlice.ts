import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type RawDataPokemons } from '../../types/Pokemon';
import { type PokemonData } from '../../components/features/pokemon/PokemonCard';


export const pokemonsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<RawDataPokemons, string>({
        query: (urlEndingPart) => `pokemon/${urlEndingPart}`,
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
        //  
        getPokemonsWithGender: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {

            const femalePokemonsResult = await fetchWithBQ('gender/1')
            if (femalePokemonsResult.error) {
              throw femalePokemonsResult.error;
            }
            const femalePokemons = femalePokemonsResult.data;
              
            const malePokemonsResult = await fetchWithBQ(`gender/2`)
            if (malePokemonsResult.error) {
              throw malePokemonsResult.error;
            }
            const malePokemons = malePokemonsResult.data;

            const otherPokemonsResult = await fetchWithBQ(`gender/3`)
            if (otherPokemonsResult.error) {
              throw otherPokemonsResult.error;
            }
            const otherPokemons = otherPokemonsResult.data;

              return (malePokemonsResult.data && femalePokemons)
                ? { data: { malePokemons, femalePokemons, otherPokemons }}
                : { error: malePokemonsResult.error || femalePokemonsResult.error || otherPokemonsResult.error }
            },
        }),

        //
    })
});

export const { useGetPokemonsQuery, useGetPokemonByUrlQuery, useGetPokemonsWithGenderQuery } = pokemonsApi ;