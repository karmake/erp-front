/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Meli() {
const [tokenTG, setTokenTG] = useState('');
const query = useQuery();
const myParam = query.get('code'); // Substitua 'myParam' pelo nome do seu parâmetro

  useEffect(() => {
    
  
    setTokenTG(myParam);
    buscaAccessToken(myParam); 

  }, [myParam]);


  function buscaAccessToken(tokenTG) {

    const myHeaders = new Headers();
    const accessToken = localStorage.getItem('jwt_token'); // Pegando o token do localStorage
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
    const raw = JSON.stringify({
      "code": tokenTG
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    console.log(requestOptions);
  
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/meli/code-to-token`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        const data = new Date().toISOString();
  
        console.log('DATASSSSS');
        console.log(data);
        console.log('RESULTADOS');
        console.log(result);
  
        localStorage.setItem('data_retorno_meli', data);
        localStorage.setItem('access_token_meli', result.postResponse.access_token);
        localStorage.setItem('token_type_meli', result.postResponse.token_type);
        localStorage.setItem('expires_in_meli', result.postResponse.expires_in);
        localStorage.setItem('scope_meli', result.postResponse.scope);
        localStorage.setItem('user_id_meli', result.postResponse.user_id);
        localStorage.setItem('refresh_token_meli', result.postResponse.refresh_token);
        localStorage.setItem('refresh_token_tg_meli', tokenTG);
  
        // Redireciona para a página de sucesso
        window.location.href = "/administracao/integracoes?status=sucesso&integracao=mercadolivre";
  
      })
      .catch((error) => {
        alert(error.error);
        console.error(error);
      });
  }
  

  return (
    <>
      <div>
        <p>Hello World</p>
        <p>Valor do parâmetro: {tokenTG}</p> {/* Exibindo o valor do parâmetro na tela */}
      </div>
    </>
  );
}

export default Meli;
