import { useState } from "react";
import { usePokemonDispatch, usePokemonSelector } from "../../../redux/features/pokemon-hook";
import { changePokemonGenderOptions, changePokemonTypesOptions } from "../../../redux/features/reducer";
import { TYPE_POKEMON_GENDER, TYPE_POKEMON_TYPE } from "../../../constants/filterTypes";

type CheckboxPropsType= {
    filterType: string;
    checkboxLabel: string;
    checkboxValue: string;
    checkboxId: string;
    optionsArray: string[];
    setOptionsArray: Function;
}


const Checkbox = ({checkboxLabel,checkboxValue, checkboxId, optionsArray, setOptionsArray, filterType}: CheckboxPropsType) => {
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const filteringData = usePokemonSelector((state) => state.filteringData);
    const dispatch = usePokemonDispatch();
  console.log('filteringData : ', filteringData);
  
    const clickHandler= () => {
   
        let newOptions:string[];
        if(isChecked) {
             newOptions= optionsArray.filter(ele => ele !== checkboxValue);
            
        } else {
             newOptions= [...optionsArray, checkboxValue];
        }
        setIsChecked(!isChecked);
        setOptionsArray(newOptions)
        if(filterType === TYPE_POKEMON_GENDER) {
          dispatch(changePokemonGenderOptions(newOptions)); 
        } else if(filterType === TYPE_POKEMON_TYPE) {
          dispatch(changePokemonTypesOptions(newOptions)); 
        }
        
    }
    
  return (
    <>
        <label className='px-2' htmlFor={checkboxId}>{checkboxLabel}</label>
        <input type='checkbox' value={checkboxValue} checked={isChecked} id={checkboxId} onChange={clickHandler}/>
    </>
  )
}

export default Checkbox