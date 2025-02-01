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
    width:100vw;
    border: 1px solid gray;

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
    width: 66.66%;
    @media (max-width: 900px) {

width: 100%;



}

`

export const ImportantContent = styled.div`
     display: flex;
    flex:1;
    flex-direction: row;
    white-space: normal; 
    word-wrap: break-word;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

   
    
`

export const ButtonsContainer = styled.div`

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%; 
`

export const ContentText = styled.div`

    display: flex;
    width: 50%; 
    flex-wrap: wrap;
    white-space: normal; 
    word-wrap: break-word;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    color: white;



`
export const Conainer1 = styled.div`

    display: flex;
    flex-direction: column;
    width:100vw;
    background-color: black;
    flex: 1;


    



`

export const Comment1 = styled.div`


    display: flex;

    @media (max-width: 400px) {

display: none;


}

`