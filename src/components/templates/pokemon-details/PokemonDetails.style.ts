import styled from 'styled-components';

export const StyledPokemonDetails= styled.div`
.pokemon-description {
    width: 756px;
    margin: auto;
    

    .description-section {
        .pokemon-image-container {
            height: 277px;
            margin: 0 40px;
            .pokemon-image {
                width: 157px;
                height: 154px;
            }
        }

        .pokemon-id-name {
            margin-right: 40px;
            .pokemon-name {
                text-transform: uppercase;
                width: 182px;
                height: 35px;
                font-family: Roboto;
                font-size: 30px;
                font-weight: 800;
                line-height: 35.16px;
                letter-spacing: 0.06em;
                text-align: left;
                color: #2E3156;
            }
            .vertical-divider {
                width: 32px;
                height: 32px;
                margin-left: 32px;
                border-left: 1px solid #5D5F7E;
            }

            .pokemon-id {
                width: 55px;
                height: 35px;
                font-family: Roboto;
                font-size: 30px;
                font-weight: 400;
                line-height: 35.16px;
                letter-spacing: 0.06em;
                text-align: left;
                color: #2E3156;
            }

            .arrow-btns {
                display: flex;
                gap: 15px;
                height: 20px;
            }

        }
    }
    
    .property-label {
        width: 83px;
        height: 25px;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 700;
        line-height: 25px;
        text-align: left;
        text-align: center;
    }

    .property-value {
        width: 83px;
        text-align: center;
    }
   
   
   
}
`;

export default StyledPokemonDetails;