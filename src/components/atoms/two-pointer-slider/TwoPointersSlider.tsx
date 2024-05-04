import MultiRangeSlider from "multi-range-slider-react";
import { type RefObject, useEffect, useState } from "react";
import { StyledTwoPointerSlider } from "./TwoPointersSlider.style";
import {STAT_RANGE} from '../../../types/stat-range-type';

type TwoPointersSliderPropsType= {
  parentRef: RefObject<HTMLDivElement>;
  rangeType: string;
  resetFilters: boolean;
  setStatRange: Function;

}

type ChangeResult = {
	min: number;
	max: number;
	minValue: number;
	maxValue: number;
};

const TwoPointersSlider = ({parentRef, rangeType, setStatRange, resetFilters}: TwoPointersSliderPropsType) => {
  const [minValue, set_minValue] = useState(70);
  const [maxValue, set_maxValue] = useState(150);

  useEffect(() => {
    set_minValue(70);
    set_maxValue(150);
  }, [resetFilters]);
  
  useEffect(() => {
    if(parentRef && parentRef.current) {
      const parentElement= parentRef.current;
      const thumbLeft= parentElement.getElementsByClassName('thumb-left')[0];
      const thumbRight= parentElement.getElementsByClassName('thumb-right')[0];
      if(thumbLeft) {
        thumbLeft.setAttribute('data-before', `${minValue}`);
        thumbRight.setAttribute('data-before', `${maxValue}`);
        setStatRange((prevRanges : STAT_RANGE) => {
          return {
            ...prevRanges,
            [rangeType]: {minValue,maxValue},
          }
        })
      }
    }
    
  }, [minValue,maxValue])
  
  const handleInput = (e: ChangeResult ) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  return (
    <StyledTwoPointerSlider>
      <span>minValue: {minValue}</span>
      <span>maxValue: {maxValue}</span>
      <div className="two-pointer-slider">
        <MultiRangeSlider
          min={0}
          max={210}
          step={5}
          minValue={minValue}
          maxValue={maxValue}
          onInput={(e) => {
            handleInput(e);
          }}
        />
      </div>
    </StyledTwoPointerSlider>
  );
};

export default TwoPointersSlider;
