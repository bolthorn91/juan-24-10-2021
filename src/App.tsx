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
                <div className="app">
                    <h1>Order book</h1>
                    <div className="app__tables-container">
                        <div className="app__table">
                            <h1>Bids</h1>
                            {orderbook.bids.map((order, index) => (
                                <div 
                                    className="app__table-row"
                                    key={index}
                                >
                                    {order.map(value => (
                                        <p key={value}>{value}</p>
                                    ))}

                                </div>
                            ))}
                        </div>
                        <div className="app__table">
                            <h1>Asks</h1>
                            {orderbook.asks.map((order, index) => (
                                <div 
                                    className="app__table-row"
                                    key={index}
                                >
                                    {order.map(value => (
                                        <p key={value}>{value}</p>
                                    ))}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
