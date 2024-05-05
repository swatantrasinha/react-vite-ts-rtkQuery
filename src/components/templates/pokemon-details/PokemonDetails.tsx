import { useParams, useLocation } from "react-router-dom";
import { StyledPokemonDetails } from "./PokemonDetails.style.ts";
import { generatePokemonId } from "../../../utils/string-manipulation.ts";
import leftArrowIcon from "/icons/left-arrow-icon.svg";
import rightArrowIcon from "/icons/right-arrow-icon.svg";
import closeIcon from "/icons/close-icon.svg";
import { useGetPokemonDescriptionQuery } from "../../../redux/features/pokemonsSlice.ts";
import { PokemonDescriptionRawDataType } from "../../../types/Pokemon.ts";
import PokemonDescription from "../../molecules/pokemon-description/PokemonDescription.tsx";
import ProgressBar from "../../atoms/progress-bar/ProgressBar.tsx";

const PokemonDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name, imageUrl , weight, height, abilities, pokemonGender, stats} = location.state;
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
    
    return (
      <StyledPokemonDetails>
        <div className="pokemon-description  border border-black">
          <main className="">
            <section className="description-section flex mt-6">
              <div className="pokemon-image-container w-1/4 border flex justify-center items-center">
                <div className="pokemon-image">
                  <img
                    className="pokemon-img"
                    src={imageUrl}
                    alt={`Pokemon with name : ${{ name }}`}
                  />
                </div>
              </div>
              <div>
                <div className="pokemon-id-name-and-details">
                  <div className="pokemon-id-name flex">
                    <div className="pokemon-name">{name}</div>
                    <div className="vertical-divider"></div>
                    <div className="pokemon-id">{generatePokemonId(id!)}</div>
                    <div className="vertical-divider"></div>
                    <div className="arrow-btns">
                      <div className="left-arrow-img-container">
                        <button>
                          {" "}
                          <img
                            src={leftArrowIcon}
                            alt="left arrow button for pagination"
                          />{" "}
                        </button>
                      </div>

                      <div className="left-arrow-img-container">
                        <button>
                          {" "}
                          <img src={closeIcon} alt="close button" />{" "}
                        </button>
                      </div>

                      <div className="left-arrow-img-container">
                        <button>
                          {" "}
                          <img
                            src={rightArrowIcon}
                            alt="right arrow button for pagination"
                          />{" "}
                        </button>
                      </div>
                    </div>
                  </div>

                  
                  <div className="pokemon-details">
                     <PokemonDescription descriptionArrayData={descriptionData!} />
                  </div>
                  
                </div>
              </div>
            </section>

            <section className="properties-section flex justify-between m-4">
              <div className="pokemon-height">
                  <div className="property-label height-label">Height</div>
                  <div className="property-value height-value">{height}</div>
              </div>

              <div className="pokemon-weight">
                  <div className="property-label weight-label">Weight</div>
                  <div className="property-value weight-value">{weight}</div>
              </div>
              
              <div className="pokemon-gender">
                  <div className="property-label gender-label">Gender(s)</div>
                  <div className="property-value gender-value">
                  {pokemonGender?.map((ele: string,index:number) => {
                    const uniqueKey=`pokemon-gender--${index}`;
                    if(index === (pokemonGender.length-1)) {
                      return (
                        <span key={uniqueKey}>{`${ele}`}</span>
                      )
                    }
                    return (
                      <>
                      <span key={uniqueKey}>{`${ele},`}</span>
                      <br/>
                      </>
                  )})}
                  </div>
              </div>
              
              <div className="pokemon-egg-groups">
                <div className="property-label egg-groups-label">Egg Groups</div>
                <div className="property-value egg-groups-value">
                  {eggGroupsData?.map((ele,index) => {
                    const uniqueKey=`egg-group-${index}`;
                    if(index === (eggGroupsData.length-1)) {
                      return (
                        <span key={uniqueKey}>{`${ele}`}</span>
                      )
                    }
                    return (
                      <>
                      <span key={uniqueKey}>{`${ele},`}</span>
                      <br/>
                      </>
                  )})}
                </div>
              </div>

            </section>

            <section className="properties-section flex justify-between m-4">
                <div className="second-row-properties pokemon-abilities">
                  <div className="property-label abilities-label">Abilities</div>
                  <div className="property-value height-value">
                  {abilities?.map((
                    ele: {ability: {name:string; url: string}},
                    index:number
                  ) => {
                    const uniqueKey=`pokemon-ability--${index}`;
                    
                    if(index === (abilities.length-1)) {
                      return (
                        <span key={uniqueKey}>{`${ele.ability.name}`}</span>
                      )
                    }
                    return (
                      <>
                      <span key={uniqueKey}>{`${ele.ability.name},`}</span>
                      <br/>
                      </>
                  )})}
                  </div>
                </div>

                <div className="second-row-properties pokemon-types">
                  <div className="property-label types-label">Types</div>
                  <div className="property-value types-value">
                    <span className="pokemon-property-types">Fire</span>
                    <span className="pokemon-property-types">Flying</span>
                  </div>
              </div>

              <div className="second-row-properties pokemon-weak-against">
                  <div className="property-label pokemon-weak-agains-label">Weak Against</div>
                  <div className="property-value weipokemon-weak-againsght-value">
                      <span className="pokemon-property-types">Fighting</span>
                      <span className="pokemon-property-types">Ground</span>
                      <span className="pokemon-property-types">Steel</span>
                      <span className="pokemon-property-types">Water</span>
                      <span className="pokemon-property-types">Grass</span>
                  </div>
              </div>
            </section>

            <section className="stats-section-container  mx-4 my-16">
                <h1 className="stats-heading p-8">Stats</h1>
                <div className="stats-section flex justify-between">
                  {stats.map((statData: {base_stat: number; stat: {name: string}},index: number) => {
                        const uniqueId= `stat-type-${index}`;
                        const {base_stat, stat: {name}}= statData;
                        return (
                          <div key={uniqueId} className="stat-label-and-progress-bar">
                            <div className="stat-type-label">{name}</div>
                            <div className="stat-type-progress-bar">
                            <ProgressBar value={(base_stat/120)*100}/>
                            </div>
                          </div>
                        )
                      })} 
              </div>
            

            </section>
           

          </main>
        </div>
      </StyledPokemonDetails>
    );
  
 
};

export default PokemonDetails;
