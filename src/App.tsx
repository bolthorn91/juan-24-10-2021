import React, { useEffect, useState } from 'react';
import { getOrderbookSocket } from './domain/orders/getOrderbookSocket';
import { IOrderbook, ITableRow } from 'domain/types/types';
import { Table } from 'components/Table/Table';
import { getTableRows } from 'adapters/getTableRows';
import { calculateSpread } from 'adapters/calculateSpread';
import { useWindowDimensions } from 'hooks/getWindowDimensions';
import { PRICE_COLORS } from 'domain/types/enums';
import './App.scss';

export const App = () => {
    const { width } = useWindowDimensions();
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

    const spreadComponent = (
        <div className="app__spread-container">
            <p>Spread: </p>
            {spread && (
                <>
                    <p> {spread.total}</p>
                    <p> ({spread.percentage}%)</p>
                </>
            )}
        </div>
    )

    return (
        <>
            {orderbook && (
                <div className="app">
                    <div className="app__title-container">
                        <h1 className="app__title-text">Order book</h1>
                        {width >= 992 && spreadComponent}
                    </div>
                    <div className="app__tables-container">
                        {bids && (
                            <Table 
                                rows={bids}
                                priceColor={PRICE_COLORS.GREEN}
                            />
                        )}
                        {width < 992 && spreadComponent}
                        {asks && (
                            <Table 
                                rows={asks}
                                priceColor={PRICE_COLORS.RED}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
