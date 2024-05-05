import { FormEvent, useRef, RefObject } from 'react';
import InputTextbox from '../../atoms/input-textbox/InputTextbox';
import {StyledSearchInput} from './SearchInput.style';
import { usePokemonDispatch } from '../../../redux/features/pokemon-hook';
import { saveSearchInputValue } from '../../../redux/features/reducer';
import searchIcon from '/icons/search-icon.svg';

const SearchInput = () => {
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null);
  
  const dispatch= usePokemonDispatch();
  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const searchValue= searchInputRef?.current?.value || null;
    dispatch(saveSearchInputValue(searchValue));   
  }


  return (
    <StyledSearchInput>
      <form className='search-input' onSubmit={formSubmitHandler}>
        <InputTextbox labelValue='Search by' inputType='text' placeholderValue='Name or Number' searchInputRef={searchInputRef} />
        <button className='search-btn' aria-label='pokemon search'> 
          <img src={searchIcon} alt='pokemon search button'/>
        </button>
      </form>
    </StyledSearchInput>
  )
}

export default SearchInput