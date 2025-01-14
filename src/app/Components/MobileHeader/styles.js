import styled from "styled-components";

export const Container = styled.div`

    width:100vw;
    display: none;
    flex-direction: row;
    z-index: 5000;
    position:fixed;
    bottom: 0;
    background-color: #141414;
    justify-content: space-between;
    color:white;

    padding: 1rem;

    

    @media (max-width: 768px) {
    display:flex;
  } 


`

export const MenuItem = styled.div`

  display:flex;
  flex-direction: column;
  text-decoration: none;
  color: white;
  gap: 0.3rem;


`

export const Icon = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`

export const TextMenu = styled.p`

  font-size: 0.8rem;
  text-align: center

`