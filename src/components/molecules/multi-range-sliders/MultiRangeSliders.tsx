import { useEffect, useRef, useState } from "react";
import { StyledMultiRangeSliders } from "./MultiRangeSliders.style";
import TwoPointersSlider from "../../atoms/two-pointer-slider/TwoPointersSlider";
import { usePokemonDispatch } from "../../../redux/features/pokemon-hook";
import { savePokemonsStatsFilters } from "../../../redux/features/reducer";
import {STAT_HP, STAT_ATTACK, STAT_DEFENSE, STAT_SPEED, STAT_SPECIAL_ATTACK, STAT_SPECIAL_DEFENSE} from '../../../constants/filterTypes.ts';
type MultiRangeSlidersPropsType = {
  dropdownLabel: string;
  resetFilters: boolean;
  setResetFilters: Function;
};

const MultiRangeSliders = ({ dropdownLabel, resetFilters, setResetFilters }: MultiRangeSlidersPropsType) => {
  const dispatch= usePokemonDispatch();
  const initialState = {
    [STAT_HP]: {minValue:0,maxValue:0},
    [STAT_ATTACK] : {minValue:0,maxValue:0},
    [STAT_DEFENSE] : {minValue:0,maxValue:0},
    [STAT_SPEED] : {minValue:0,maxValue:0},
    [STAT_SPECIAL_ATTACK] : {minValue:0,maxValue:0},
    [STAT_SPECIAL_DEFENSE] : {minValue:0,maxValue:0},
  };
  const resetStatHandler = () => {
    setStatRange(initialState);
  };

  useEffect(() => {
    resetStatHandler();
    dispatch(savePokemonsStatsFilters(null));
    setResetFilters(false);
  }, [resetFilters]);



  const applyStatHandler = () => {
    dispatch(savePokemonsStatsFilters(statRange));
  };
  
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [statRange, setStatRange] = useState(initialState);
  const getDropdownCls = showOptions ? "open" : "closed";
  const hp_range_ref = useRef<HTMLDivElement>(null);
  const attack_range_ref= useRef<HTMLDivElement>(null);
  const defense_range_ref= useRef<HTMLDivElement>(null);
  const speed_range_ref= useRef<HTMLDivElement>(null);
  const sp_attack_range_ref= useRef<HTMLDivElement>(null);
  const sp_def_range_ref= useRef<HTMLDivElement>(null);
  
  const dropdownHandler = () => {
    setShowOptions(!showOptions);
  };

  return (
    <StyledMultiRangeSliders>
      <div className="multi-range-sliders">
        <div className="multi-range-sliders-label mb-1">{dropdownLabel}</div>

        <div className="dropdown-button-and-options flex flex-col">
          <button
            className={`selected-values-button flex justify-between w-full items-center cursor-pointer border rounded-lg border-black ${getDropdownCls}`}
            onClick={dropdownHandler}
          >
            <div className="drodpdown-selected-values">
              {" "}
              Normal <span>+5 More</span>
            </div>
            <div className="dropdown-button">
              {showOptions ? (
                <i className="arrow up"></i>
              ) : (
                <i className="arrow down"></i>
              )}
            </div>
          </button>

          {showOptions && (
            <div className="dropdown-options border rounded-lg border-black z-10">
              <div className="heading-and-closeBtn">
                <div className="select-stats-heading"> Select Stats</div>
                <div className="close-btn-container">
                  <button onClick={() => setShowOptions(false)}>X</button>
                </div>
              </div>

              <div className="stats-range-selectors">

                <div className="label-and-stat-range-selector" ref={hp_range_ref}>
                    <div className="stat-heading">HP</div>
                    <div className="stat-range-selector">
                        <TwoPointersSlider parentRef={hp_range_ref} rangeType={STAT_HP} setStatRange={setStatRange} resetFilters={resetFilters} />
                    </div>
                </div>
                
                <div className="label-and-stat-range-selector" ref={attack_range_ref}>
                    <div className="stat-heading">Attack</div>
                    <div className="stat-range-selector">
                        <TwoPointersSlider parentRef={attack_range_ref} rangeType={STAT_ATTACK} setStatRange={setStatRange} resetFilters={resetFilters} />
                    </div>
                </div>

                  <div className="label-and-stat-range-selector" ref={defense_range_ref}>
                    <div className="stat-heading">Defense</div>
                    <div className="stat-range-selector">
                        <TwoPointersSlider parentRef={defense_range_ref} rangeType={STAT_DEFENSE} setStatRange={setStatRange} resetFilters={resetFilters} />
                    </div>
                </div>

                  <div className="label-and-stat-range-selector" ref={speed_range_ref}>
                    <div className="stat-heading">Speed</div>
                    <div className="stat-range-selector">
                        <TwoPointersSlider parentRef={speed_range_ref} rangeType={STAT_SPEED} setStatRange={setStatRange} resetFilters={resetFilters} />
                    </div>
                </div>

                  <div className="label-and-stat-range-selector" ref={sp_attack_range_ref}>
                    <div className="stat-heading">Sp. Attack</div>
                    <div className="stat-range-selector">
                        <TwoPointersSlider parentRef={sp_attack_range_ref} rangeType={STAT_SPECIAL_ATTACK} setStatRange={setStatRange} resetFilters={resetFilters} />
                    </div>
                </div>

                  <div className="label-and-stat-range-selector" ref={sp_def_range_ref}>
                    <div className="stat-heading">Sp. Def.</div>
                    <div className="stat-range-selector">
                        <TwoPointersSlider parentRef={sp_def_range_ref} rangeType={STAT_SPECIAL_DEFENSE} setStatRange={setStatRange} resetFilters={resetFilters} />
                    </div>
                </div>  

                <div className="reset-and-apply-btns">
                    <button className="reset-btn" onClick={resetStatHandler}>Reset</button>
                    <button className="apply-btn" onClick={applyStatHandler}>Apply</button>
                </div>
              
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledMultiRangeSliders>
  );
};

export default MultiRangeSliders;
