import { useState } from 'react';
import { PokemonDescriptionPropsType } from '../../../types/Pokemon'
import { getCompleteString } from '../../../utils/string-manipulation';
import {StyledPokemonDescription} from './PokemonDescription.style';
import Overlay from '../overlay/Overlay';

const PokemonDescription = ({descriptionArrayData}: PokemonDescriptionPropsType) => {
  const completeText = getCompleteString(descriptionArrayData!);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <StyledPokemonDescription>
      <>
        <div className='line-clamp'>{completeText}</div>
        <button className='read-more' onClick={() =>setShowOverlay(true) }>read more</button>
        {showOverlay && (<Overlay completeText={completeText} setShowOverlay={setShowOverlay} />)}
      </>
    </StyledPokemonDescription>
  )
}

export default PokemonDescription