import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { App } from './App';
import { OrderbookSocket as OrderbookSocketMocked } from 'domain/orders/OrderbookSocket';
import { AppProvider } from 'context/AppContext';

const mockedOrderbook = {
    bids: [[100, 2]],
    asks: [[101, 1]]
};
jest.mock('domain/orders/OrderbookSocket', () => ({
    OrderbookSocket: jest.fn()
}))

afterAll(() => {
    jest.clearAllMocks()
})

describe('App', () => {
    test('should render order book title', async() => {
        (OrderbookSocketMocked as jest.Mock)
            .mockImplementation(setOrderbook => setOrderbook(mockedOrderbook))
        const { getByText } = render(
            <AppProvider>
                <App />
            </AppProvider>
        );
        await waitFor(() => {
            getByText(/Order book/)
        })
        expect(getByText(/Order book/)).toBeInTheDocument();
        expect(getByText(/Spread/)).toBeInTheDocument();
        expect(OrderbookSocketMocked).toBeCalledTimes(1);
    });
})


