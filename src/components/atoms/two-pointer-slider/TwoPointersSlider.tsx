import MultiRangeSlider from "multi-range-slider-react";
import { type RefObject, useEffect, useState } from "react";
import { StyledTwoPointerSlider } from "./TwoPointersSlider.style";

type TwoPointersSliderPropsType= {
  parentRef: RefObject<HTMLDivElement>
}

type ChangeResult = {
	min: number;
	max: number;
	minValue: number;
	maxValue: number;
};

const TwoPointersSlider = ({parentRef}: TwoPointersSliderPropsType) => {
  const [minValue, set_minValue] = useState(70);
  const [maxValue, set_maxValue] = useState(150);

  useEffect(() => {
    // console.log('parentRef : ', parentRef.current);
    if(parentRef && parentRef.current) {
      const parentElement= parentRef.current;
      const thumbLeft= parentElement.getElementsByClassName('thumb-left')[0];
      const thumbRight= parentElement.getElementsByClassName('thumb-right')[0];
      if(thumbLeft) {
        thumbLeft.setAttribute('data-before', `${minValue}`);
        thumbRight.setAttribute('data-before', `${maxValue}`);
      }
    }
    
    // const thumbLeft= document.getElementsByClassName('thumb-left')[0];
    // const thumbRight= document.getElementsByClassName('thumb-right')[0];
    // if(thumbLeft) {
    //   thumbLeft.setAttribute('data-before', `${minValue}`);
    //   thumbRight.setAttribute('data-before', `${maxValue}`);
    // }
  }, [minValue,maxValue])
  
  const handleInput = (e: ChangeResult ) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  return (
    <StyledTwoPointerSlider>
      {/* <span>minValue: {minValue}</span> */}
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
