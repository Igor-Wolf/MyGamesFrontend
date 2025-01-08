
import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    
    border-radius:0.40rem;
    position: relative;

    color: black;

    padding: 2px 12px;
    margin: 0.5rem;
    min-width: 80px;
    max-width:80px;
    width: 100%;
    font-size: 1rem;
    font-weight: 600;
    min-width: 167px;
    height: 33px;
    background:rgb(187, 14, 14);


    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }


    &::after {
        content: '';
        position: absolute;
       
        top: -5px;
        left: -6px;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        border-radius: 22px;
    }
    


    ${({ variant }) => variant !== "primary" && css`
    min-width: 167px;
    height: 33px;
    background:rgb(21, 117, 9);
    


    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }


    &::after {
        content: '';
        position: absolute;
       
        top: -5px;
        left: -6px;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        border-radius: 22px;
    }
`}


`