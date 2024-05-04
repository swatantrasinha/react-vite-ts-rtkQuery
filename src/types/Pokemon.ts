export type PokemonBasicData = {
  name: string;
  url: string;
};
export type PokemonPropsTypeWithoutFilter = {
  id: string;
  name: string;
  url: string;
};

export type PokemonPropsTypeWithFilter = {
  id: string;
  name: string;
  imageUrl: string;
};

export type RawDataPokemons = {
  count: number;
  next: string;
  previous: string;
  results: PokemonBasicData[];
};

export type PokemonPropsType = {
  // isFilterApplied?: boolean;
  pokemonProperties: PokemonPropsTypeWithFilter | PokemonData;
};

export type PokemonCardPropsType = {
  pokemonProperties: PokemonPropsTypeWithoutFilter;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStateType = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonSpritesType = {
  other: {
    dream_world: {
      front_default: string;
    };
  };
};
export type PokemonData = {
  id: string;
  name: string;
  imageUrl: string;
  stats: PokemonStateType[];
  types: PokemonType[];
  sprites: PokemonSpritesType;
};

export type PokemonRawDataType = {
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  data: PokemonData;
};

export type PokemonListProps = {
  pokemonList: PokemonBasicData[] | PokemonData[] | null;
  isFilterApplied: boolean;
  setResetFilters: Function;
};

export type FilteredPokemonsPropsType ={ 
  uniqueId: string;
  pokemon: PokemonData | PokemonBasicData; 
  isFilterApplied: boolean;
  setResetFilters: Function;
}

export type RequiredForEvolution= {
  name: string;
  url: string;
}

export type Pokemon_Species= {
  pokemon_species: RequiredForEvolution
  rate: number;
}

export type PokemonGenderRawDataType = {
  id: number;
  name: string;
  pokemon_species_details: Pokemon_Species[];
  required_for_evolution: RequiredForEvolution[];
}