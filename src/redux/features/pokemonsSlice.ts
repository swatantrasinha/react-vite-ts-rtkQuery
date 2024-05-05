import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  RawPokemonDescriptionType, ResponseFromApiPokemonDescriptionType,  type RawDataPokemons } from '../../types/Pokemon';
import { type PokemonData } from '../../types/Pokemon';
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
            sprites: response.sprites,
            height: response.height,
            weight: response.weight,
            abilities:response.abilities, // .map(ele => ele.ability),
          };
          return formattedResponse;
        },
        }),
        
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

       
        
        getPokemonDescription: builder.query<ResponseFromApiPokemonDescriptionType, string> ({
          query: (pokemonId) => `pokemon-species/${pokemonId}/`,
            transformResponse: (response: (RawPokemonDescriptionType )) => {   
              const rawEggGroupsData  = response.egg_groups;
              const eggGroups= rawEggGroupsData.map(ele => ele.name);
              const raw_flavor_text_entries= response.flavor_text_entries;              
              const descriptionEnglishArray= raw_flavor_text_entries.filter(ele => (ele.language.name === 'en'))
              const descriptionArray= descriptionEnglishArray.map(ele => ele.flavor_text)

              
            const formattedResponse= {
              flavor_text_entries: descriptionArray, 
              egg_groups: eggGroups
            };
            return formattedResponse;
          },
          }),         
    })
});

export const { useGetPokemonsQuery, useGetPokemonByUrlQuery, useGetPokemonsWithGenderQuery, useGetPokemonDescriptionQuery } = pokemonsApi ;