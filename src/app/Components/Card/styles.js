import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    color: white;
    width: 100%;
    transition: all 0.3s ease-in-out; /* Transição suave para todas as propriedades */

    &:hover {
        opacity: 0.6;
        cursor: pointer;
        padding-left: 5rem;
        background-color: #747825;
        transform: scale(1.05); /* Aumenta o tamanho do componente quando passar o mouse */
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Sombra para dar a sensação de flutuar */
    }

    @media (max-width: 900px) {
        justify-content: space-evenly;
        gap: 2rem;
    }
`;



export const ImageBanner = styled.img`

    width:150px;
    height:80px;
    filter: brightness(70%);
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 80px;
    min-width: 150px;


   



`

export const ImportantContent = styled.div`
     display: flex;
    width: 20%; /* Cada item ocupa 20% da largura da div maior */
    flex-wrap: wrap;
    white-space: normal; 
    word-wrap: break-word;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    @media (max-width: 900px) {

width: 50%;



}

`

export const ContentText = styled.div`

    display: flex;
    width: 20%; /* Cada item ocupa 20% da largura da div maior */
    flex-wrap: wrap;
    white-space: normal; 
    word-wrap: break-word;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    



    
@media (max-width: 900px) {

display: none;



}


`
