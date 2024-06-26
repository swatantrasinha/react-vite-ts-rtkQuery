import { useEffect, useState } from "react";
import { usePokemonDispatch } from "../../../redux/features/pokemon-hook";
import { changePokemonGenderOptions, changePokemonTypesOptions } from "../../../redux/features/reducer";
import { TYPE_POKEMON_GENDER, TYPE_POKEMON_TYPE } from "../../../constants/filterTypes";

type CheckboxPropsType= {
    filterType: string;
    checkboxLabel: string;
    checkboxValue: string;
    checkboxId: string;
    optionsArray: string[];
    resetFilters: boolean;
    setOptionsArray: Function;
}


const Checkbox = ({checkboxLabel,checkboxValue, checkboxId, optionsArray, setOptionsArray, filterType, resetFilters}: CheckboxPropsType) => {
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const dispatch = usePokemonDispatch();

    useEffect(() => {
      setIsChecked(true);
    }, [resetFilters]);
  
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