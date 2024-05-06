import styled from 'styled-components';

export const StyledPokemonDetailsPage= styled.div`
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
    .pokemon-abilities, .pokemon-types {
        width: 25%;
    }
    .pokemon-weak-against {
        width: 50%;
    }
     
    .second-row-properties .property-label, .property-value {
        width: unset;
    }
    .pokemon-property-types {
        width: 39px;
        height: 25px;
        border-radius: 5px 0px 0px 0px;
        border: 1px 0px 0px 0px;
        border: 1px solid #2E3156;
        margin-left: 10px;
    }
    .pokemon-property-types:first-child {
        background-color: pink;
    }
    .pokemon-property-types:nth-child(2) {
        background-color: lightblue;
    }
    .pokemon-property-types:nth-child(3) {
        background-color: orange;
    }
    .pokemon-property-types:nth-child(4) {
        background-color: lightgray;
    }
    .pokemon-property-types:nth-child(5) {
        background-color: lightgreen;
    }
.stats-section-container {
    background: #B0D2D2;
    border-radius: 8px;

    .stat-heading {
            width: 47px;
            height: 25px;
            font-family: Roboto;
            font-size: 20px;
            font-weight: 700;
            line-height: 25px;
            text-align: left;
    }
    .stats-section {
        width: 100%;
        height: 165px;
        border-radius: 8px 0px 0px 0px;
        
        display: grid;
        grid-template-columns: repeat(2, 1fr);
       

        .stat-label-and-progress-bar {
            display: flex;
            justify-content: space-evenly;
            width: 300px;
            height: 25px;

            .stat-type-label {
                text-transform: capitalize;
                padding-left: 16px;
            }
        }
    }
}

}
`;

export default StyledPokemonDetailsPage;