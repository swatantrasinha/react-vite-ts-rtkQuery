import InputTextbox from '../../atoms/input-textbox/InputTextbox';
import {StyledSearchInput} from './SearchInput.style';

const SearchInput = () => {
  return (
    <StyledSearchInput>
      <div className='search-input'>
        <InputTextbox labelValue='Search by' inputType='text' placeholderValue='Name or Number '/>
      </div>
    </StyledSearchInput>
  )
}

export default SearchInput