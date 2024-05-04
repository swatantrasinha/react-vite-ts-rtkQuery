import styled from 'styled-components';

export const StyledSearchInput= styled.div`
  .search-input {  
    position: relative;

    .input-textbox {
        display: flex;
        flex-direction: column;
        width: 663px;
        border-radius: 8px 0px 0px 0px;
        opacity: 0px;
        input {
          height: 57px;
          background: #C9DDE2;
        }
        label {
          margin-bottom: 5px;
          font-family: Roboto;
          font-size: 16px;
          font-weight: 400;
          line-height: 18.75px;
          text-align: left;
        }
    }

    button.search-btn {
      position: absolute;
      top: 50%;
      right: 5%;
}
    }
  }
`;