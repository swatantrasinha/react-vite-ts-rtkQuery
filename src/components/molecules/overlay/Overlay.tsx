
import {StyledOverlay} from './Overlay.style';
import closeWhiteIcon from "/icons/close-white-icon.svg";


type OverlayPropsType = {
    completeText: string;
    setShowOverlay: Function;
}
const Overlay = ({completeText, setShowOverlay}: OverlayPropsType) => {
  return (
    <StyledOverlay>
      <div className='overlay-contents'>
        <div className='close-btn-container flex justify-end mt-4 mr-4'>
           <button onClick={() => setShowOverlay(false)}>
            <img src={closeWhiteIcon} alt="close button" />{" "}
          </button>
        </div>

        <div className='text-contents m-8'>{completeText}</div>
      </div>
    </StyledOverlay>
  )
}

export default Overlay