import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  PokemonEvolutionDataType, PokemonEvolutionPhaseRawDataType, PokemonEvolutionRawDataType, RawPokemonDescriptionType, ResponseFromApiPokemonDescriptionType,  type RawDataPokemons } from '../../types/Pokemon';
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
            abilities:response.abilities,
          };
          return formattedResponse;
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


            getPokemonEvolution: builder.query({
              async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                let evolution1Details;
                let evolution2Details;
                let evolution3Details;
                
              const pokemonEvolution   = await fetchWithBQ(`evolution-chain/${_arg}/`) as PokemonEvolutionRawDataType; 
                
              if(pokemonEvolution.data) {
                const evolutionData : PokemonEvolutionDataType = pokemonEvolution!.data!;

                const evolutionUrl1= evolutionData?.chain?.species?.url;
                const evolutionUrl2= evolutionData?.chain.evolves_to[0]?.species?.url;
                const evolutionUrl3= evolutionData?.chain.evolves_to[0]?.evolves_to[0]?.species.url;

                if(evolutionUrl1) {
                    const pokemonEvolution1Data = await fetchWithBQ(`${evolutionUrl1}`)
                    if(pokemonEvolution1Data.data) {
                    const evolution1Data: PokemonEvolutionPhaseRawDataType =pokemonEvolution1Data as PokemonEvolutionPhaseRawDataType;
                    const evolution1Varities= evolution1Data.data.varieties;
                    
                    
                    const evolution1Varity = evolution1Varities?.filter(ele => ele.is_default)
                    
                    const phase1PokemonDetails= evolution1Varity[0]?.pokemon?.url;
                    if(phase1PokemonDetails) {
                      const pokemonDetails1 = await fetchWithBQ(`${phase1PokemonDetails}`)
                      if(pokemonDetails1.data) {
                          const evolutionPhase1RawData= pokemonDetails1.data! as PokemonData;
                          const imageUrl= evolutionPhase1RawData.sprites.other.dream_world.front_default ;
                          const {id,name}= evolutionPhase1RawData;
                          const evolutionPhase1Data= {name,id,imageUrl };
                          evolution1Details= evolutionPhase1Data;
                      }
                    }
                    }
                }

                if(evolutionUrl2) {
                  const pokemonEvolution2Data = await fetchWithBQ(`${evolutionUrl2}`)
                  if(pokemonEvolution2Data.data) {
                  const evolution2Data: PokemonEvolutionPhaseRawDataType =pokemonEvolution2Data as PokemonEvolutionPhaseRawDataType;
                  const evolution1Varities= evolution2Data.data.varieties;
                  
                  
                  const evolutions2Variety = evolution1Varities?.filter(ele => ele.is_default)
                  
                  const phase2PokemonDetails= evolutions2Variety[0]?.pokemon?.url;
                  if(phase2PokemonDetails) {
                    const pokemonDetails2 = await fetchWithBQ(`${phase2PokemonDetails}`)
                    if(pokemonDetails2.data) {
                        const evolutionPhase1RawData= pokemonDetails2.data! as PokemonData;
                        const imageUrl= evolutionPhase1RawData.sprites.other.dream_world.front_default ;
                        const {id,name}= evolutionPhase1RawData;
                        const evolutionPhase2Data= {name,id,imageUrl };
                        evolution2Details= evolutionPhase2Data;
                    }
                  }
                  }
                }

                if(evolutionUrl3) {
                  const pokemonEvolution3Data = await fetchWithBQ(`${evolutionUrl3}`)
                  if(pokemonEvolution3Data.data) {
                  const evolution3Data: PokemonEvolutionPhaseRawDataType =pokemonEvolution3Data as PokemonEvolutionPhaseRawDataType;
                  const evolution3Varities= evolution3Data.data.varieties;
                  
                  
                  const evolutions3Variety = evolution3Varities?.filter(ele => ele.is_default)
                  
                  const phase3PokemonDetails= evolutions3Variety[0]?.pokemon?.url;
                  if(phase3PokemonDetails) {
                    const pokemonDetails3 = await fetchWithBQ(`${phase3PokemonDetails}`)
                    if(pokemonDetails3.data) {
                        const evolutionPhase3RawData= pokemonDetails3.data! as PokemonData;
                        const imageUrl= evolutionPhase3RawData.sprites.other.dream_world.front_default ;
                        const {id,name}= evolutionPhase3RawData;
                        const evolutionPhase3Data= {name,id,imageUrl };
                        evolution3Details= evolutionPhase3Data;
                    }
                  }
                  }
                }

              }
                const finalEvolutionData= {evolution1Details, evolution2Details, evolution3Details};
                               
                 return { data : finalEvolutionData}
              },
          }),
          

    })
});

export const { useGetPokemonsQuery, useGetPokemonByUrlQuery, useGetPokemonsWithGenderQuery, useGetPokemonDescriptionQuery, 
  useGetPokemonEvolutionQuery
// useGetPokemonsWithGender1Query

 } = pokemonsApi ;