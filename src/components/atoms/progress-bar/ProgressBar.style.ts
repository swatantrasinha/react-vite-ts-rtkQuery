import styled from 'styled-components';

export const StyledProgressBar= styled.div`
.progress-bar-container {
    position: relative;
    width: 214px;
    height: 13px;
    
    .parent-div {
        background: grey;
        height: 13px;
        width: 100%;
    }
    .child-div {
        background: #2E3156;
        height: 13px;
        position: absolute;
        top:0;
        left: 0;
        .percentage-display {
            position: absolute;
            left: 1px;
            top: -5px;
            color: white;
            width: 12px;
            height: 25px;
            font-family: Roboto;
            font-size: 10px;
            font-weight: 700;
            line-height: 25px;
            text-align: left;
        }
    }
}`;

export default StyledProgressBar;