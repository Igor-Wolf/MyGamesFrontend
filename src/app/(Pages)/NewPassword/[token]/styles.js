import styled from "styled-components";

export const Container = styled.div`

display: flex;
    flex-direction: column;
    flex:1;
    width: 100vw;
    height: 100vh;
    position:relative;
    overflow:hidden;
    
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {

height:auto;
overflow: visible;
padding-top: 80px;
padding-bottom: 30px;
}

`

export const ContainerIntern = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    min-height: 400px;
    min-width: 400px;
    border-radius: 1rem;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);

    @media (max-width: 768px) {

width: 90vw;
min-width: auto;
}


`

export const Title = styled.div`

  font-size: 1.5rem;
  font-weight:600;
  color: rgb(21, 117, 9);
  margin-bottom: 1.5rem;

`

export const Text = styled.div`


  font-weight:600;
  color: white;
  

`

export const TextLink = styled.div`

  font-weight:600;
  color: rgb(21, 117, 9);

  &:hover {
        opacity: 0.6;
        cursor: pointer;
    }


`

export const TextRsponse = styled.div`


font-weight:600;
  color: orange;
  text-wrap: wrap;
  text-align: center;
  
`


export const Form = styled.form`
  
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius:1rem; 

  @media (max-width: 768px) {

  width: 90%;

}
   
  
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  width:100%;
  
  max-width: 1000px;
  border-radius:1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  background-color: transparent;

  padding: 0.5rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 200px;
  padding: 8px;
  box-sizing: border-box; 

  border-radius:0.40rem;

  background-color:rgb(223, 214, 214);
  color: black;

  @media (max-width: 768px) {

    width: 100%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {

flex-wrap: wrap;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
}
`

export const ErrorBox = styled.div`

    padding: 1rem;
    color: red;
    font-weight: 600;
    margin-bottom: -20px;

`

export const VideoBg = styled.video`

position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  
  z-index: -2; /* Coloca o vídeo atrás do conteúdo */

  @media (max-width: 768px) {
    width:100%;
    height:100%;}

`

export const VideoBgColor = styled.video`

  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1; /* Coloca o vídeo atrás do conteúdo */
  
`





