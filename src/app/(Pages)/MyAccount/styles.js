import styled from "styled-components";

export const Container = styled.div`

display: flex;
    flex-direction: column;
    flex:1;
    width: 100vw;
    height: 100vh;
    position:relative;
    overflow:hidden;
    font-family: 'Roboto';
    
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

    max-width:400px;

    font-weight:600;
  color: white;

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
  
  max-width: 100%;
  font-weight:500;
  color: white;
  text-wrap: wrap;
  overflow-wrap: break-word;
  text-align: justify;
  

`

export const TextLink = styled.div`

  font-weight:600;
  color: rgb(21, 117, 9);


`


export const DataAccount = styled.div`
  
  
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
`;

export const Wrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {

flex-wrap: wrap;


}
`
export const ImageWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

export const ExternalWrapper = styled.div`
  
  
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

export const ErrorBox = styled.div`

    padding: 0.5rem;
    color: red;
    font-weight: 600;

`

export const VideoBg = styled.video`

position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  height: 100%;
  width:100%;
  
  z-index: -2; /* Coloca o vídeo atrás do conteúdo */

`

export const VideoBgColor = styled.video`

  position: absolute;
  width: 100%;
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1; /* Coloca o vídeo atrás do conteúdo */
`


export const ImageProfile = styled.img`

  width:200px;
  height: 200px;
  max-width:200px;
  max-height: 200px;
  border-radius: 10rem;

`

export const ButtonWrapper = styled.div`

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

`





