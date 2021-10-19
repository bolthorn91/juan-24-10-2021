import React, { useEffect, useState } from 'react';
import { getOrderbookSocket } from './domain/orders/getOrderbookSocket';
import { IOrderbook } from 'domain/types/types';
import './App.scss';
import { Table } from 'components/Table';

export const App = () => {
    const [orderbook, setOrderbook] = useState<IOrderbook | undefined>(undefined)

    useEffect(() => {
        getOrderbookSocket(setOrderbook)
    }, [orderbook])

    return (
        <>
            {orderbook && (
                <div className="app">
                    <h1>Order book</h1>
                    <div className="app__tables-container">
                        <Table 
                            orders={orderbook.bids}
                            title="Bids"
                        />
                        <Table 
                            orders={orderbook.asks}
                            title="Asks"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
