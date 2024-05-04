import styled from 'styled-components';

export const StyledPokemon= styled.div`
  .pokemon-card {
    width: 194px;
    height: 277px;
    border-radius: 8px;
    border: 1px solid #2E3156;

    
    .pokemon-img {
        width: 120px;
        height: 119px;
        margin-top: 43px;
        margin-left: 37px;
    }
    .pokemon-name {
        width: 91px;
        height: 23px;
        font-family: Roboto;
        font-size: 20px;
        font-weight: 600;
        line-height: 23.44px;
        text-align: center;
        margin: auto;
    }
    .pokemon-index {
        margin: auto;
        width: 34px;
        height: 23px;
        font-family: Roboto;
        font-size: 20px;
        font-weight: 400;
        line-height: 23.44px;
        text-align: center;
    }

  }
`;