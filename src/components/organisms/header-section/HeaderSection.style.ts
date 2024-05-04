import styled from 'styled-components';

export const StyledHeaderSection= styled.div`
.logo-separator-heading {
    display: flex;
    justify-content: space-between;
    width: 630px;
    height: 53px;
    margin-top: 43px;
    
    .header-logo-container {
      width: 128px;
      height: 35px;
      font-family: Roboto;
      font-size: 30px;
      font-weight: 700;
      line-height: 35.16px;
      letter-spacing: 0.06em;
      text-align: left;
      color: #2E3156;
    }

    .vertical-line-separator {
      width: 53px;
      height: 42px;
      margin-left: 50px;
      border-left: 1px solid #5D5F7E;
    }

    .header-heading {
      width: 439px;
      height: 23px;
      font-family: Roboto;
      font-size: 20px;
      font-weight: 500;
      line-height: 23.44px;
      text-align: left;
      color: #5D5F7E;
    }
}
`;