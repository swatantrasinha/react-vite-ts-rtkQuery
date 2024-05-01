import {StyledSearchSection} from './SearchSection.style';
import SearchInput from '../../molecules/search-input/SearchInput'
import MultiSelectDropdown from '../../molecules/multi-select-dropdown/MultiSelectDropdown';
import { typeOptions, genderOptions } from '../../../constants/filterOptions';
const SearchSection = () => {
 
  return (
    <StyledSearchSection>
      <div className='search-section flex justify-between'>
        <SearchInput />
        <MultiSelectDropdown dropdownLabel='Type' dropdownOptions={typeOptions}/>
        <MultiSelectDropdown dropdownLabel='Gender'dropdownOptions={genderOptions} />
        {/* <MultiSelectDropdown dropdownLabel='Stats'/> */}
      </div>
    </StyledSearchSection>
  )
}

export default SearchSection