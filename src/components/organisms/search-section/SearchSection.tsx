import {StyledSearchSection} from './SearchSection.style';
import SearchInput from '../../molecules/search-input/SearchInput'
import MultiSelectDropdown from '../../molecules/multi-select-dropdown/MultiSelectDropdown';
import { typeOptions, genderOptions } from '../../../constants/filterOptions';
import MultiRangeSliders from '../../molecules/multi-range-sliders/MultiRangeSliders';
const SearchSection = () => {
 
  return (
    <StyledSearchSection>
      <div className='search-section flex justify-between'>
        <SearchInput />
        <MultiSelectDropdown dropdownLabel='Type' dropdownOptions={typeOptions}/>
        <MultiSelectDropdown dropdownLabel='Gender'dropdownOptions={genderOptions} />
        <MultiRangeSliders dropdownLabel='Stats'/>
      </div>
    </StyledSearchSection>
  )
}

export default SearchSection