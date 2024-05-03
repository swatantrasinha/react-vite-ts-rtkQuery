import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type RawDataPokemons } from '../../types/Pokemon';
import { type PokemonData } from '../../components/features/pokemon/PokemonCard';
import { getPokemonNamesByGender } from '../../utils/filterAndStore-functions';



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
              
            const femalePokemonsResult  = await fetchWithBQ('gender/1')
            if (femalePokemonsResult.error) {
              throw femalePokemonsResult.error;
            }
            const femalePokemonsList= getPokemonNamesByGender(femalePokemonsResult);
            const malePokemonsResult = await fetchWithBQ(`gender/2`)
            if (malePokemonsResult.error) {
              throw malePokemonsResult.error;
            }
            
            const malePokemonsList= getPokemonNamesByGender(malePokemonsResult);

            const genderlessPokemonsResult = await fetchWithBQ(`gender/3`)
            if (genderlessPokemonsResult.error) {
              throw genderlessPokemonsResult.error;
            }
            
            const genderlessPokemonsList= getPokemonNamesByGender(genderlessPokemonsResult);
            
              return (malePokemonsList && femalePokemonsList && genderlessPokemonsList)
                ? { data: { male: malePokemonsList, female: femalePokemonsList, genderless: genderlessPokemonsList }}
                : { error: malePokemonsResult.error || femalePokemonsResult.error || genderlessPokemonsResult.error }
            },
        }),

        //
    })
});

export const { useGetPokemonsQuery, useGetPokemonByUrlQuery, useGetPokemonsWithGenderQuery } = pokemonsApi ;