import React, { useEffect, useState } from 'react';
import { getOrderbookSocket } from './domain/orders/getOrderbookSocket';
import { IOrderbook, ITableRow } from 'domain/types/types';
import { Table } from 'components/Table';
import { getTableRows } from 'adapters/getTableRows';
import { calculateSpread } from 'adapters/calculateSpread';
import './App.scss';

export const App = () => {
    const [orderbook, setOrderbook] = useState<IOrderbook | undefined>(undefined)
    const [bids, setBids] = useState<ITableRow[]>([])
    const [asks, setAsks] = useState<ITableRow[]>([])
    const [spread, setSpread] = useState<{total: number, percentage: number}>({total: 0, percentage: 0});

    useEffect(() => {
        getOrderbookSocket(setOrderbook)
        if (orderbook) {
            const _bids = getTableRows(orderbook.bids);
            const _asks = getTableRows(orderbook.asks);
            const {total, percentage} = calculateSpread(_bids[0].price, _asks[0].price);
            setBids(_bids);
            setAsks(_asks);
            setSpread({total, percentage});
        }
    }, [orderbook])

    return (
        <>
            {orderbook && (
                <div className="app">
                    <h1>Order book</h1>
                    <p>Spread:</p>
                    {spread && (
                        <>
                            {' '}
                            <p>{spread.total}</p>
                            {' '}
                            <p>({spread.percentage}%)</p>
                        </>
                    )}
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
