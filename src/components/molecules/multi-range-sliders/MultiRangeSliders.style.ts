import styled from "styled-components";

export const StyledMultiRangeSliders = styled.div`
  .multi-range-sliders {
    width: 194px;
    position: relative;

    .selected-values-button {
      width: 194px;
      height: 57px;
      background: #c9dde2;
      &.open {
        background: white;
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
    }

    .multi-range-sliders-label {
      width: 35px;
      height: 19px;
      font-family: Roboto;
      font-size: 16px;
      font-weight: 400;
      line-height: 18.75px;
      text-align: left;
      color: #5d5f7e;
    }

    .dropdown-options {
      width: 194px;
      /* height: 180px; */
      margin-top: 4px;
      background-color: white;
    }

    .dropdown-options {
        width: 669px;
        /* height: 469px; */
        border-radius: 8px 0px 0px 0px;
        position: absolute;
        top: 85px;
        right: 1px;
    }
    .heading-and-closeBtn {
        display: flex;
        flex-direction: row;
        
        justify-content: space-between;
    }

    .select-stats-heading {
        width: 163px;
        height: 35px;
        margin-left: 25px;
        margin-top: 25px;
        font-family: Roboto;
        font-size: 30px;
        font-weight: 700;
        line-height: 35.16px;
        text-align: left;
    }
    .close-btn-container {
        width: 20px;
        height: 20px;
        margin-right: 25px;
        margin-top: 25px;
        border: 1px solid black;
        position: relative;
        border-radius: 50%;;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .label-and-stat-range-selector {
        display: flex;
        justify-content: space-between;
        margin: 25px;
    }

    .reset-and-apply-btns {
        display: flex;
        justify-content: flex-end;
        margin: 25px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 700;
        line-height: 16.41px;
        text-align: left;
        gap: 15px;


        .reset-btn {
            width: 78px;
            height: 37px;
            border: 1px solid black;
            border-radius: 8px;
        }
        .apply-btn {
            width: 78px;
            height: 37px;
            border-radius: 8px;
            border: 1px solid black;
            background: #2E3156;
            color: #fff;
;
        }
    }
  }
`;
