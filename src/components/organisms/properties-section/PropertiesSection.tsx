import { usePokemonSelector } from '../../../redux/features/pokemon-hook';
import { Ability, PropertiesSectionPropsType, Stat_Data } from '../../../types/Pokemon';
import { findPokemonGenderByName } from '../../../utils/filterAndStore-functions';
import ProgressBar from '../../atoms/progress-bar/ProgressBar';

const PropertiesSection = ({dataForPokemonProperty} : PropertiesSectionPropsType) => {
  const pokemonDataFromStore= usePokemonSelector((state) => state.filteringData.pokemonGender);
  const {name, eggGroupsData, height, weight, stats, abilities}= dataForPokemonProperty;
  const pokemonGender  = findPokemonGenderByName(name,pokemonDataFromStore)
  
    
  return (
    <>
    {/* Section - 1 */}
        <section className="properties-section flex justify-between m-4">
            {weight && (
            <div className="pokemon-height">
                <div className="property-label height-label">Height</div>
                <div className="property-value height-value">{height}</div>
            </div>
            )}

            {height && (
            <div className="pokemon-weight">
                <div className="property-label weight-label">Weight</div>
                <div className="property-value weight-value">{weight}</div>
            </div>
            )}
        
        <div className="pokemon-gender">
            <div className="property-label gender-label">Gender(s)</div>
            <div className="property-value gender-value">
            {pokemonGender && pokemonGender?.map((ele: string,index:number) => {
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
            {eggGroupsData?.map((ele:string,index:number) => {
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

    {/* Section - 2 */}
      <section className="properties-section flex justify-between m-4">
                <div className="second-row-properties pokemon-abilities">
                  <div className="property-label abilities-label">Abilities</div>
                  <div className="property-value height-value">
                  {abilities?.map((
                    ele: Ability,
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


    {/* Section - 3 */}
            <section className="stats-section-container  mx-4 my-16">
                <h1 className="stats-heading p-8">Stats</h1>
                <div className="stats-section flex justify-between">
                  {stats && stats.map((statData: Stat_Data,index: number) => {
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
  </>
  )
}

export default PropertiesSection