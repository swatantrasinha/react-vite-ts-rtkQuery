import { RefObject } from "react";

type InputPropsType= {
    labelValue: string;
    inputType: string;
    placeholderValue: string;
    searchInputRef: RefObject<HTMLInputElement>
}

const InputTextbox = ({labelValue,inputType, placeholderValue, searchInputRef }: InputPropsType) => {
  return (
    <div className="input-textbox">
        <label htmlFor='input-textbox'>{labelValue}</label>
        <input ref={searchInputRef} type={inputType} id='input-textbox' placeholder={placeholderValue} />
    </div>
  )
}

export default InputTextbox