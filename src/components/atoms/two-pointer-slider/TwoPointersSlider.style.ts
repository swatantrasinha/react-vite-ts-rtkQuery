import styled from 'styled-components';

export const StyledTwoPointerSlider= styled.div`
.two-pointer-slider {
   
    background: #F1F3F3;

    .multi-range-slider {
        width: 438px;
        height: 31px;
        border: 1px solid black;
        border-radius: 8px;
        position:relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .caption {
            display: block;
        }
        .bar-inner {
            background-color: #93B2B2 !important;
        }
        .bar-left,.bar-right {
            background: #93B2B2 !important;
        }

        .bar {
            width: 372px;
            height: 5px;
            .thumb::before {
                width: 26px;
                height: 17px;
                border-radius: 50px !important;
            }
            .thumb::before {
                background: #2E3156;
                color: #fff;
                content:  attr(data-before);
                font-size: smaller;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: 1px;
            }
            .thumb .caption, .ruler {     
                display: none;
            }
        }
        .labels .label {
            width: 9px;
            height: 19px;
            font-family: Roboto;
            font-size: 16px;
            font-weight: 300;
            line-height: 18.75px;
            text-align: left;
            color: #2E3156;
        }

        .labels .label:first-child {
            position: absolute;
            left: 19px;
            top: 32%;
        }

        .labels .label:last-child {
            position: absolute;
            right: 4px;
            top: 30%;
        }
    }

}
`;