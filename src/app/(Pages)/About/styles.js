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
    width: 100%;


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
    align-items: center;
    justify-content: center;

    


`
export const MainText = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    max-width: 1000px;
    padding: 1rem;
    word-wrap: break-word;
white-space: normal; 
text-align: justify;

`

export const TextContent = styled.div`
    color: white;

`

export const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;

`