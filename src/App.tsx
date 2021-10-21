import React, { useEffect, useState } from 'react';
import { getOrderbookSocket } from './domain/orders/getOrderbookSocket';
import { IOrderbook, ITableRow } from 'domain/types/types';
import { Table } from 'components/Table';
import './App.scss';
import { getTableRows } from 'adapters/getTableRows';

export const App = () => {
    const [orderbook, setOrderbook] = useState<IOrderbook | undefined>(undefined)
    const [bids, setBids] = useState<ITableRow[]>([])
    const [asks, setAsks] = useState<ITableRow[]>([])

    useEffect(() => {
        getOrderbookSocket(setOrderbook)
        if (orderbook) {
            setBids(getTableRows(orderbook.bids))
            setAsks(getTableRows(orderbook.asks))
        }
    }, [orderbook])

    return (
        <>
            {orderbook && (
                <div className="app">
                    <h1>Order book</h1>
                    <div className="app__tables-container">
                        {bids && (
                            <Table 
                                title="Bids"
                                rows={bids}
                            />
                        )}
                        {asks && (
                            <Table 
                                title="Asks"
                                rows={asks}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
