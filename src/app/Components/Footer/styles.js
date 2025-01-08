import styled, { css } from 'styled-components';

export const TextContent = styled.div`
    
    align-items: center;
    justify-content:center;
    text-align: center;    
    margin: 1rem 0.5rem;
    display:flex;
    flex-direction: row;
    gap: 0.5rem; 
    color: white;

    
    
`

export const TextContentExternal = styled.div`

    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`

export const Wrapper = styled.div`

    width:100vw;
    background-color: rgba(0, 0, 0, 1); /* 50% transparente */    

    @media (max-width: 768px) {
    
    
    padding-bottom: 1rem;


  }

`

export const TextLink = styled.p` 

    font-weight: 600;
    


    &:hover{

         color: #9a9a9c
    }

`