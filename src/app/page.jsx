'use client'
import React, { useEffect, useState } from 'react';
import { api } from './Services/api';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Conainer, TitleContainer, TitleText } from './styles';
import { Banner } from './Components/Banner';
import { SlideGames, TrendingGames } from './Components/SlideGames';
import { Divisor } from './Components/Divisor';
import { Loading } from './Components/Loading';


export default function Home() {
  const router = useRouter()
  const [data, setData] = useState(null);

  const [trending, setTrending] = useState(null);
  const [nextReleases, setNextReleases] = useState(null);
  const [popularGames, setPopularGames] = useState(null);
  const [metacritic, setMetacritic] = useState(null);



  
  useEffect(() => {
    const auth = localStorage.getItem("token");
    
    if (!auth) {
      
      router.push("/Login")
      return;
    }

    const req = async () => {
      try {
        const [response, trending, nextReleases, popularGames, metacritic] = await Promise.all([
          
          api.get('/login/protected', {
            headers: {
              Authorization: `Bearer ${auth}`,  // Certificando-se que o token é enviado corretamente
            }
          }),
          api.get('/games/trendingGames'),
          api.get('/games/releases'),
          api.get('/games/topGames'),
          api.get('/games/metacriticGames')
        ]);
    
        // Aqui, você pode definir o estado com as respostas recebidas
        setData(response.status);  
        setTrending(trending.data);
        setNextReleases(nextReleases.data);
        setPopularGames(popularGames.data);
        setMetacritic(metacritic.data);
    
        // Verificando o status da requisição de login (response)
        if (response.status !== 200) {
          router.push("/Login");
        }
    
      } catch (error) {
        console.error("Erro nas requisições:", error);
       
      }
    };
    

    req();
  }, []);  // Dependências vazias, para que seja executado apenas uma vez ao carregar o componente

  return (
    <Conainer>   
      
      {data === 200 && trending   ? <pre>
      <Banner></Banner>
      
        <TitleContainer>
          <TitleText>
            Trending Games
          </TitleText>
          <Divisor></Divisor>
        </TitleContainer>
        <SlideGames gameList={trending}></SlideGames>
        
         <TitleContainer>
          <TitleText>
            Next Releases
          </TitleText>
          <Divisor></Divisor>
        </TitleContainer>
        <SlideGames gameList={nextReleases}></SlideGames>
        
        <TitleContainer>
          <TitleText>
            Popular Games
          </TitleText>
          <Divisor></Divisor>
        </TitleContainer>
        <SlideGames gameList={popularGames}></SlideGames>
        <TitleContainer>
          <TitleText>
            Top Metacritc
          </TitleText>
          <Divisor></Divisor>
        </TitleContainer>
        <SlideGames gameList={metacritic}></SlideGames> 
            
      
      </pre>
      
        : <pre>
          <Loading></Loading>
        </pre>
          
          }
    </Conainer>
  );
}
