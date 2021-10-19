import React, { useEffect, useState } from 'react';
import { getOrderbookSocket } from './domain/orders/getOrderbookSocket';
import { IOrderbook } from 'domain/types/types';
import './App.scss';

export const App = () => {
    const [orderbook, setOrderbook] = useState<IOrderbook | undefined>(undefined)

    useEffect(() => {
        getOrderbookSocket(setOrderbook)
    }, [orderbook])

    return (
        <>
            {orderbook && (
                <h1>Order book</h1>
            )}
        </>
    );
}
