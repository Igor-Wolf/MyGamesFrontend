import styled, { css } from 'styled-components';




export const Conainer = styled.div`

    display: flex;
    flex-direction: column;
    width:100vw;
    background-color: black;
    flex: 1;


    padding-top: 60px;

`


export const TitleContainer = styled.div`


    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;


`

export const TitleText = styled.div`

    display: flex;
    color: white;
    font-size: 1.2rem;
    
    


`

export const MainContent = styled.div`

    display: flex;
    flex-direction: column;
    flex-grow: 1;


`

export const ContainerRow = styled.div`

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width:100%;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
        background-color: #747825;
        
    }

`
export const ContainerRowIntern = styled.div`

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width:83%;

`

export const ImportantContent = styled.div`
     display: flex;
    width: 16.6%; /* Cada item ocupa 20% da largura da div maior */
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

export const ButtonsContainer = styled.div`

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

