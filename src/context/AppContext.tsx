import { OrderbookSocket } from 'domain/orders/OrderbookSocket';
import { IOrderbook, ISocketDataMessage } from 'domain/types/types';
import * as React from 'react';

interface AppValueContext {
    webSocket: OrderbookSocket;
    setWebSocket: (ws: OrderbookSocket) => void;
    orderbook: IOrderbook;
    setOrderbook: (message: ISocketDataMessage) => void;
}

const AppContext = React.createContext<AppValueContext | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}

const AppProvider = ({ children }: IProps) => {
    const [webSocket, setWebSocket] = React.useState<OrderbookSocket | undefined>(undefined);
    const [orderbook, setOrderbook] = React.useState<IOrderbook | undefined>(undefined);

    const value = {
        webSocket,
        setWebSocket,
        orderbook,
        setOrderbook
    } as AppValueContext;
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

export { AppProvider, useAppContext };
