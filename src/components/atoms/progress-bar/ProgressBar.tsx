import {StyledProgressBar} from './ProgressBar.style'
type ProgressBarPropsType= {
    value: number;   
}
const ProgressBar = ({value}:ProgressBarPropsType) => {
  return (
    <StyledProgressBar>
       <div className='progress-bar-container'>
          <div className="parent-div" />
          <div className="child-div" style={{ width: `${value}%` }}>
            <span className='percentage-display'>{Math.trunc(value)}</span>
          </div>
        </div>
    </StyledProgressBar>
  )
}

export default ProgressBar