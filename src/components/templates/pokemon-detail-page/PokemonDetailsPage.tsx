import { useParams,  Link } from "react-router-dom";
import { generatePokemonId } from "../../../utils/string-manipulation.ts";
import leftArrowIcon from "/icons/left-arrow-icon.svg";
import rightArrowIcon from "/icons/right-arrow-icon.svg";
import closeIcon from "/icons/close-icon.svg";
import { useGetPokemonByUrlQuery, useGetPokemonDescriptionQuery } from "../../../redux/features/pokemonsSlice.ts";
import { PokemonDescriptionRawDataType, PokemonRawDataType } from "../../../types/Pokemon.ts";
import PokemonDescription from "../../molecules/pokemon-description/PokemonDescription.tsx";
import PropertiesSection from "../../organisms/properties-section/PropertiesSection.tsx";
import {StyledPokemonDetailsPage} from'./PokemonDetailsPage.style.ts';
import PokemonEvolution from "../../features/pokemon-evolution/PokemonEvolution.tsx";
import { usePokemonSelector } from "../../../redux/features/pokemon-hook.ts";
import { useEffect, useState } from "react";

const PokemonDetailsPage = () => {
    const { id } = useParams();
    
    const splitArray= window.location.href.split('/');
    const splitArrayLen= splitArray.length;
    const pokemonId= splitArray[splitArrayLen-1];
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [previousUrl, setPreviousUrl] = useState<string | null>(null);
    const rawData: PokemonRawDataType = useGetPokemonByUrlQuery<PokemonRawDataType>(`${id!}`);
    
    let pokemonWeight;
    let pokemonHeight;
    let pokemonAbilities;
    let pokemonStats;
    let pokemonName;
    let pokemonImage;
    const pokemonList = usePokemonSelector((state) => state.filteringData.pokemonsList);
    const filteredPokemonList= usePokemonSelector((state) => state.filteringData.filteredPokemonsList);
    const pokemonsForPreviousAndNext= (filteredPokemonList && filteredPokemonList.length >0) ? filteredPokemonList :  pokemonList;

    useEffect(() => {
      
      const position= pokemonsForPreviousAndNext.findIndex(ele => Number(ele.id) === Number(pokemonId));
      if(position === 0 ){
        setPreviousUrl(null);
        const nextPokemon= pokemonsForPreviousAndNext[position +1];
        const nextPokemonIndex= nextPokemon.id;
        setNextUrl(`${nextPokemonIndex}`);
      }
      if(position === (pokemonsForPreviousAndNext.length -1)) {
        setNextUrl(null);
        const prevPokemon= pokemonsForPreviousAndNext[position -1];
        const prevPokemonIndex= prevPokemon.id;
        setPreviousUrl(`${prevPokemonIndex}`);
      }
      if((position >= 1) && (position <= (pokemonsForPreviousAndNext.length-2))) {
        const nextPokemon= pokemonsForPreviousAndNext[position +1];
        const nextPokemonIndex= nextPokemon.id;
        setNextUrl(`${nextPokemonIndex}`);

        const prevPokemon= pokemonsForPreviousAndNext[position -1];
        const prevPokemonIndex= prevPokemon.id;
        setPreviousUrl(`${prevPokemonIndex}`);
      }
    }, [pokemonId, pokemonsForPreviousAndNext]);

    const responseFromApi: PokemonDescriptionRawDataType = useGetPokemonDescriptionQuery<PokemonDescriptionRawDataType>(id!.toString());
    if (responseFromApi.isFetching) {
        return <p>loading desc..</p>;
      } else if (responseFromApi.isError) {
        return <p>Some error </p>;
      }
      let descriptionData;
      let eggGroupsData;
    
      if (responseFromApi.isSuccess) {
      
        const {egg_groups, flavor_text_entries }= responseFromApi.data;
          descriptionData =flavor_text_entries;
          eggGroupsData=egg_groups;
        }
        if(rawData.isSuccess) {       
            const {data: { name, stats, weight, height, abilities}}= rawData;
            pokemonWeight=weight;
            pokemonHeight=height;
            pokemonAbilities= abilities;
            pokemonStats=stats;
            pokemonName= name;
            pokemonImage= rawData.data.sprites.other.dream_world.front_default;
        }
          
  return (
    <StyledPokemonDetailsPage>
       <div className="pokemon-description  border border-black">
          <main className="">
            <section className="description-section flex mt-6">
              <div className="pokemon-image-container w-1/4 border flex justify-center items-center">
                <div className="pokemon-image">
                  <img
                    className="pokemon-img"
                    src={pokemonImage}
                    alt={`Pokemon with name : ${ pokemonName }`}
                  />
                </div>
              </div>
              <div>
                <div className="pokemon-id-name-and-details">
                  <div className="pokemon-id-name flex">
                    <div className="pokemon-name">{pokemonName}</div>
                    <div className="vertical-divider"></div>
                    <div className="pokemon-id">{generatePokemonId(id!)}</div>
                    <div className="vertical-divider"></div>
                    <div className="arrow-btns">
                      {previousUrl && (
                        <div className="left-arrow-img-container">
                        <Link to={`/pokemon/${previousUrl}`}>
                            
                            <img
                              src={leftArrowIcon}
                              alt="left arrow button for pagination"
                            />
                          </Link>
                        </div>
                      )}
                   

                      <div className="left-arrow-img-container">
                        <button>
                          
                          <img src={closeIcon} alt="close button" />{" "}
                        </button>
                      </div>

                      {nextUrl && (
                          <div className="left-arrow-img-container">
                          <Link to={`/pokemon/${nextUrl}`}>
                            <img
                              src={rightArrowIcon}
                              alt="right arrow button for pagination"
                            />
                            </Link>
                        </div>
                      )}
               
                    </div>
                  </div>

                  
                  <div className="pokemon-details">
                     <PokemonDescription descriptionArrayData={descriptionData!} />
                  </div>
                  
                </div>
              </div>
            </section>
            
            
        {rawData.isSuccess && (
            <PropertiesSection dataForPokemonProperty= {{ 
                name: pokemonName!, 
                eggGroupsData, 
                weight:pokemonWeight, 
                height: pokemonHeight, 
                abilities: pokemonAbilities || [], 
                stats: pokemonStats
                }}
             />
        )}

        <PokemonEvolution id={`${id}`} />
        
        </main>
    </div>
    </StyledPokemonDetailsPage>
  )
}

export default PokemonDetailsPage;