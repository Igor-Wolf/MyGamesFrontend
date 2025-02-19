import React from 'react'
import { Container, MenuItem, Icon, TextMenu} from './styles'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

const  MobileHeader = () => {
  return (
      <Container>
          <Link href={'/'}>
          <MenuItem>
              
              <Icon>
                  
              <i className='bi bi-house-door'></i>

              </Icon>
              
             
              <TextMenu>HOME</TextMenu>
              
              
              
              
          </MenuItem> 
          </Link>

          <Link href={'/Search'}>
          <MenuItem>
              
              <Icon>
                  
                      
                      <i className="bi bi-search"></i>

              </Icon>
              
             
              <TextMenu>SEARCH</TextMenu>
              
              
              
              
          </MenuItem> 
          </Link>
          <Link href={'/SearchPrices'}>
          <MenuItem>
              
              <Icon>
                  
                      
              <i className="bi bi-currency-dollar"></i>

              </Icon>
              
             
              <TextMenu>Prices</TextMenu>
              
              
              
              
          </MenuItem> 
          </Link>

          <Link href={'/About'}>
          <MenuItem>
              
              <Icon>
                  
              <i className="bi bi-person"></i>

              </Icon>
              
             
              <TextMenu>ABOUT</TextMenu>
              
              
              
              
          </MenuItem> 
          </Link>

          
                   
          
    </Container>
  )
}

export {MobileHeader}