import styled from 'styled-components';

export const StyledHomePage= styled.div`
  .home-page {
    .grid-container {
      width: 1374px;
      /* height: 921px; */
      margin-top: 244px;
      margin-left: 69px;
      display: grid;
      grid-template-columns: repeat(6,1fr);
      gap: 42px; 
      margin: 100px auto;
    }
    .pokemon-pagination {
      width: 1374px;
      display: flex;
      justify-content: center;
      button {
        width: 100px;
        height: 50px;
        border: 1px solid black;
        background-color: #fafafa;
        margin: 50px;
      }
    }
  }
`;