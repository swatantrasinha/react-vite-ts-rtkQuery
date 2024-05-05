export const generatePokemonId= (pokemonId: string) => {  
    if(pokemonId.length == 1) {
        return `00${pokemonId}`;
    }
    return `0${pokemonId}`;
}

export const getCompleteString= (strArray:string[]) => {
        const addStrings = (total:string, start:string) => {   
          return `${total} ${start}`;
        }
    const result= strArray.reduce(addStrings);
    return result;
}