'use client'
import { TextContent, Wrapper, TextLink, TextContentExternal } from './styles';
import { Divisor } from '../Divisor';


const Footer = () => { 

  return (
    <Wrapper>
      <Divisor />
      <TextContentExternal>
        <TextContent>
          <p>© 2024. All Rights Reserved to Igor Barbosa. Database provided by <a href="https://rawg.io/" style={{ fontWeight: 600, color:  'white' }} > RAWG </a> and <a href="https://isthereanydeal.com/" style={{ fontWeight: 600, color:  'white' }} > Isthereanydeal </a>.  Developed by <a href="https://github.com/Igor-Wolf" style={{ fontWeight: 600, color:  'white' }} > IB </a>
          </p>
        </TextContent>
      </TextContentExternal>
    </Wrapper>
  );
};

export { Footer };