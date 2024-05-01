import styled from 'styled-components';

export const StyledMultiSelectDropdown = styled.div`
  .multi-select-dropdown {
    width: 194px;

    .selected-values-button {
        width: 194px;
        height: 57px;
        background: #C9DDE2;
        &.open {
            background: white;
        }
        
        
        .drodpdown-selected-values {
            width: 105px;
            height: 16px;
            font-family: Roboto;
            font-size: 14px;
            font-weight: 300;
            line-height: 16.41px;
            padding-left: 5px;
            text-align: left;

            span {
                font-family: Roboto;
                font-size: 14px;
                font-weight: 700;
                line-height: 16.41px;
                text-align: left;
            }
        }
    }

    .dropdown-label {
        width: 35px;
        height: 19px;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 400;
        line-height: 18.75px;
        text-align: left;
        color: #5D5F7E;
    }
 
    .dropdown-button {
        padding-right: 10px;
        .arrow {
            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
        }

        .up {
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
        }

        .down {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
    }

    .dropdown-options {
        width: 194px;
        height: 180px;
        margin-top: 4px;
        background-color: white;;
    }
    .type-option {

    }
  }
`;