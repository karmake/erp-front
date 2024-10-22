export const parseJwt = (token) => {
    try {
      
      const base64Url = token.split('.')[1]; // A segunda parte é o payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Ajuste para Base64
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
  
      return JSON.parse(jsonPayload); // Retorna o objeto JSON do payload
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  };