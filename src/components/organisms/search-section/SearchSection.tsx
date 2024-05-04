import {StyledSearchSection} from './SearchSection.style';
import SearchInput from '../../molecules/search-input/SearchInput'
import MultiSelectDropdown from '../../molecules/multi-select-dropdown/MultiSelectDropdown';
import { typeOptions, genderOptions } from '../../../constants/filterOptions';
import MultiRangeSliders from '../../molecules/multi-range-sliders/MultiRangeSliders';
import {type SearchSectionPropsType} from '../../../types/SearchSection';

const SearchSection = ({resetFilters, setResetFilters}:SearchSectionPropsType) => { 
  return (
    <StyledSearchSection>
      <div className='search-section flex justify-between'>
        <SearchInput />


        <MultiSelectDropdown 
            dropdownLabel='Type' 
            dropdownOptions={typeOptions}
            resetFilters={resetFilters} 
        />
        
        <MultiSelectDropdown 
          dropdownLabel='Gender'
          dropdownOptions={genderOptions} 
          resetFilters={resetFilters} 
        />
        
        <MultiRangeSliders 
          dropdownLabel='Stats'
          resetFilters={resetFilters}
          setResetFilters={setResetFilters}
          />
          
      </div>
    </StyledSearchSection>
  )
}

export default SearchSection