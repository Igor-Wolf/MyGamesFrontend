import styled, { css } from 'styled-components';


export const Conainer = styled.div`

    display: flex;
    flex-direction: column;
    width:100vw;
    background-color: black;
    flex: 1;


    padding-top: 60px;



`
export const Conainer1 = styled.div`

    display: flex;
    flex-direction: column;
    width:100vw;
    background-color: black;
    flex: 1;


    



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
    word-wrap: break-word;
    white-space: normal; 
    text-align: center;    


`

export const Content = styled.div`

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    color: white;
    align-items: center;
    padding-top: 1rem;
    flex: 1;

`

export const MainContent = styled.div`

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: white;


    @media (max-width: 900px) {

        flex-direction: column;
        margin-top: 1rem;
        


    }


`

export const SubContent = styled.div`

    display: flex;
    flex-direction: column;

    
    padding: 1rem;
    flex: 1;

    @media (max-width: 1200px) {

        flex: 0 0 48%
        
}
@media (max-width: 900px) {

margin-top: -1.5rem;



}


`

export const TextInfo = styled.div`

    display: flex;
    flex-wrap: wrap;
    word-wrap: break-word;
    white-space: normal; 
    text-align: justify;
    padding: 0.3rem;
    gap: 1rem;



`
export const TextInfoInternal = styled.div`

    display: flex;
    flex-wrap: wrap;
    word-wrap: break-word;
    white-space: normal; 
    text-align: justify;
    padding: 0.3rem;
    gap: 0.5rem;



`

export const ImageGame = styled.img`

    width:100%;
    object-fit: cover;
    max-height: 400px;
    margin-bottom: 0.5rem;
    

`

export const AccordionWrapper = styled.div`
  width: 100%;
  max-width:100%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  
`;

export const AccordionItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

export const AccordionHeader = styled.div`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

`;

export const AccordionContent = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  word-wrap: break-word;
     white-space: normal;
     flex-direction: column;
  

`;

export const ItemAccordion = styled.div`

    display: block;

`

export const ButtonsWrapper = styled.div`

    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    gap: 1rem;

`


export const TextRsponse = styled.div`

width:100%;
font-weight:600;
  color: orange;
  word-wrap: break-word;
white-space: normal; 
  text-align: center;
  
`




