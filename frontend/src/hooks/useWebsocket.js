import { useEffect, useState } from 'react';

// Constants
const { GATSBY_FAUCY_API_URL_WSS } = process.env;

export const useWebSocket = () => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(GATSBY_FAUCY_API_URL_WSS);
    ws.onopen = () => setWebSocket(ws);

    return () => ws.close();
  }, []);

  return { webSocket };
};
