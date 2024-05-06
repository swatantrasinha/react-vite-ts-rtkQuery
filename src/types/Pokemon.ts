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
  height: number;
  weight: number;
  abilities: {ability: {name: string}}[]
  pokemonGender?: string[] | undefined;
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
};

export type PokemonDescriptionRawDataType = {
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  data: ResponseFromApiPokemonDescriptionType; // RawPokemonDescriptionType;
};

export type RawPokemonDescriptionType= {
  flavor_text_entries: {flavor_text: string, language: {name: string}}[];
  egg_groups: {name: string; url: string}[];
}

export type ResponseFromApiPokemonDescriptionType= {
  flavor_text_entries: string[];
  egg_groups: string[];
}

export type PokemonDescriptionPropsType= {
  descriptionArrayData:  string[] |  null;
}


export type Ability= {
  ability: {
    name:string; 
  }
}
export type Stat_Data = {
  base_stat: number; 
  stat: { name: string }
};

export type PropertiesSectionPropsType= {
  dataForPokemonProperty :{
    name: string;
    eggGroupsData: string[] | undefined;
    weight: number | undefined;
    height: number | undefined;
    abilities?: Ability[];
    stats?: Stat_Data[];
  }
}; 


export type PokemonEvolutionDataType= {
   
    chain: {
      species: {
        url: string;
      }
      evolves_to: {
        species: {url: string};
        evolves_to : {species: {url: string}}[]
      }[]
    }
   
};

export type PokemonEvolutionRawDataType = {
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  data: PokemonEvolutionDataType;
};

export type Variety= {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
  }
};

export type PokemonEvolutionPhaseRawDataType = {
  data: {
    varieties : Variety[]
  }
}

export type PhaseOfPokemonDataType= {
  evolution1Details:  {id: string; name:string; imageUrl: string},
  evolution2Details:  {id: string; name:string; imageUrl: string},
  evolution3Details:  {id: string; name:string; imageUrl: string},
}