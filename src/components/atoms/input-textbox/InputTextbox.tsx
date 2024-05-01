type InputPropsType= {
    labelValue: string;
    inputType: string;
    placeholderValue: string;
}

const InputTextbox = ({labelValue,inputType, placeholderValue }: InputPropsType) => {
  return (
    <div className="input-textbox">
        <label htmlFor='input-textbox'>{labelValue}</label>
        <input type={inputType} id='input-textbox' placeholder={placeholderValue} />
    </div>
  )
}

export default InputTextbox