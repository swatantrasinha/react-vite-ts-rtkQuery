// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { type RawDataPokemons } from '../../types/Pokemon';

// export const pokemonApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: (builder) => ({
//     getPokemons: builder.query<RawDataPokemons , string>({
//       query: (endpoint) => `${endpoint}`,
//   }),
//     getPokemonByUrl: builder.query<unknown , string>({
//         query: (pokemonId) => `pokemon/${pokemonId}/`,
//     }),
//   }),
// });
// // export const { useGetPokemonsQuery, useGetPokemonByUrlQuery } = pokemonApi ;