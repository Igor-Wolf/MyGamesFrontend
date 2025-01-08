'use client'
import React, { useEffect, useState } from 'react';
import { api } from './Services/api';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Button } from './Components/Button';


export default function Home() {
  const router = useRouter()
  const [data, setData] = useState(null);

  
  useEffect(() => {
    const auth = localStorage.getItem("token");
    
    if (!auth) {
      
      router.push("/Login")
      return;
    }

    const req = async () => {
      try {
        const response = await api.get('/login/protected', {
          headers: {
            Authorization: `Bearer ${auth}`,  // Certificando-se que o token é enviado corretamente
          }
        });
        
        setData(response.data);
        if (response.status !== 200) {
          router.push("/Login")
        }
      } catch (error) {
        
      }
    };

    req();
  }, []);  // Dependências vazias, para que seja executado apenas uma vez ao carregar o componente

  return (
    <div style={{ paddingTop: "70px" }}>
      <h1>Olá mundo</h1>
      {data ? <pre><p>
      Bem vindo {data.user}</p>
      <Link href={`/MyAccount`}>
                <Button title="Minha Conta" variant="secondary" type="submit" />
              </Link>
            
      
      </pre> : <p>Carregando...</p>}
    </div>
  );
}
