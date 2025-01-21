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
    width: 100%;


    @media (max-width: 900px) {

        flex-direction: column;
        margin-top: 1rem;
        


    }


`

export const SubContent = styled.div`

    display: flex;
    flex-direction: column;

    
    padding: 1rem;
    flex: 0 0 33.3333%;

    @media (max-width: 1200px) {

        flex: 0 0 48%
        
}
@media (max-width: 900px) {


width: 100%;
padding: 0;





}
@media (max-width: 400px) {

    margin-top: 0;
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

    max-width:300px;
    object-fit: cover;
    max-height: 450px;
    margin-bottom: 0.5rem;
    

    @media (max-width: 400px) {

width:100vw;
}
    
 

`

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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



export const ExternalBox = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;
    @media (max-width: 400px) {

width:100vw;
flex-wrap: wrap;
}
`
export const ExternalBoxDeals = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
        background-color:rgb(37, 94, 120);
        
    }

    

    

`


export const InternalBox = styled.div`

display: flex;
    height:80px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: gray 1px solid;
    padding: 1rem;
    gap: 0.5rem;
    
    width:100%;

     @media (max-width: 400px) {

width:100vw;
}
`
export const InternalBoxTitle = styled.div`

display: flex;
    height:80px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: gray 1px solid;
    padding: 1rem;
    gap: 0.5rem;
    
    width:100%;

     @media (max-width: 400px) {

width:50vw;
}
`
export const InternalBox1 = styled.div`

display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: gray 1px solid;
    flex-wrap:wrap;
    width:100%;

    word-wrap: break-word;
  white-space: normal;
    
  @media (max-width: 400px) {

    width:100vw;
}
    


`
export const InternalBoxDeals = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: gray 1px solid;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 33.33%;  /* Ajuste para que cada item ocupe um terço */
  height: 80px;
  word-wrap: break-word;
  white-space: normal;
  text-align: center;
  @media (max-width: 400px) {

display: none;}
`;
export const InternalBoxDealsMob = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: gray 1px solid;
  padding: 0.5rem;
  gap: 1rem;
width: 100%; 
  word-wrap: break-word;
  white-space: normal;
  text-align: center;

  @media (max-width: 400px) {

display: flex;




}
`;
export const InternalBoxDealsLog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: gray 1px solid;
  padding: 0.5rem;
  gap: 1rem;
width: 100%; 
  word-wrap: break-word;
  white-space: normal;
  text-align: center;

  @media (max-width: 400px) {

display: flex;




}
`;


export const Subtext = styled.div`

    color: gray;
    font-size: 0.8rem;
`
export const SubtextFull = styled.div`

    color: gray;
    
    
`
export const SubtextFullYellow = styled.div`

    color: yellow;
    
    
`

export const HorizontalBox = styled.div`

    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

`
export const HorizontalBoxInternal = styled.div`

    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    gap: 0.5rem;

`
export const VerticalBox = styled.div`

    display:flex;
    flex-direction: column;
    width:50%;

`

export const Highlight = styled.div`
    display: flex;
    color:  rgb(21, 117, 9);

    padding:1rem;
    font-size: 1.2rem;
    word-wrap: break-word;
    white-space: normal; 
    



    

`

export const ScrollContainer = styled.div`


    
    width: 100%;
    height: 600px;
    overflow-y: scroll;
    border: 1px solid gray;


    @media (max-width: 400px) {

        height: 250px;}
        
`

