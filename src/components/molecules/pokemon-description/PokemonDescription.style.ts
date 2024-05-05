import styled from 'styled-components';

export const StyledPokemonDescription= styled.div`
.line-clamp {
    font-family: system-ui;
    width: 430px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;  
}

button.read-more {
    text-decoration: underline;
}
`;

export default StyledPokemonDescription;