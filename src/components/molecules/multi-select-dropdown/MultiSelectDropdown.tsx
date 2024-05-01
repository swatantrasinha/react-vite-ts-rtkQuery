import { useState } from 'react';
import {StyledMultiSelectDropdown} from './MultiSelectDropdown.style'
import Checkbox from '../../atoms/check-box/Checkbox';

type MultiSelectDropdownPropsType = {
    dropdownLabel: string;
    dropdownOptions: {label:string; value: string}[];
}
const MultiSelectDropdown = ({dropdownLabel, dropdownOptions}:MultiSelectDropdownPropsType) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const checkboxOptions: string[]=[];
    dropdownOptions.map(ele => {
        checkboxOptions.push(ele.value);
    })
    
    const [optionsArray, setOptionsArray] = useState(checkboxOptions);

    

    const dropdownHandler = () => {
        setShowOptions(!showOptions);
    }
    const getDropdownCls = showOptions ? 'open':'closed';

  return (
    <StyledMultiSelectDropdown>
        <div className='multi-select-dropdown '>
            <div className='dropdown-label mb-1'>{dropdownLabel}</div>

            <div className='dropdown-button-and-options flex flex-col'>
                    <button 
                        className={`selected-values-button flex justify-between w-full items-center cursor-pointer border rounded-lg border-black ${getDropdownCls}`}
                        
                        onClick={dropdownHandler}
                        >
                        <div className='drodpdown-selected-values'> Normal <span>+5 More</span></div>
                        <div className='dropdown-button'>
                            {showOptions ? (<i className="arrow up"></i>): (<i className="arrow down"></i>)}
                        </div> 
                    </button>  
                    {showOptions && (
                        <div className='dropdown-options border rounded-lg border-black z-10'>
                           {dropdownOptions.map((ele, index) => (
                            <div key={`type-${ele.label}-${index}`}>
                                <div className='type-option flex flex-row-reverse justify-end mx-2'> 
                                    <Checkbox 
                                        filterType={dropdownLabel}
                                        checkboxLabel={ele.label} 
                                        checkboxValue={ele.value}
                                        checkboxId={`chkbox-type-${ele.label}`} 
                                        optionsArray={optionsArray}
                                        setOptionsArray={setOptionsArray}
                                        />
                                </div>
                            </div>
                           ))}
                        </div>
                    )}
                    
            </div>
        </div>
    </StyledMultiSelectDropdown>
  )
}

export default MultiSelectDropdown