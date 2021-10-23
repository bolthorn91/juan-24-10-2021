import { useAppContext } from 'context/AppContext';
import { useEffect } from 'react';

export const useWindowFocus = () => {
    const { webSocket, setOrderbook } = useAppContext();

    useEffect(() => {
        window.addEventListener('blur', () =>  {
            if(webSocket) {
                webSocket.ws?.close();
            }
        });
        window.addEventListener('focus', () => {
            if (webSocket) {
                webSocket.initializeSocket(setOrderbook)
            }
        });
        return () => {
            window.removeEventListener('blur', () => {});
            window.removeEventListener('focus', () => {});
        }
    }, []);
}
