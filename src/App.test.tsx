import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { App } from './App';
import { getOrderbookSocket as getOrderbookSocketMocked } from 'domain/orders/getOrderbookSocket';

const mockedOrderbook = {
    bids: [[100, 2]],
    asks: [[101, 1]]
};
jest.mock('domain/orders/getOrderbookSocket', () => ({
    getOrderbookSocket: jest.fn()
}))

afterAll(() => {
    jest.clearAllMocks()
})

describe('App', () => {
    test('should render order book title', async() => {
        (getOrderbookSocketMocked as jest.Mock)
            .mockImplementation(setOrderbook => setOrderbook(mockedOrderbook))
        const { getByText } = render(<App />);
        await waitFor(() => {
            getByText(/Order book/)
        })
        expect(getByText(/Order book/)).toBeInTheDocument();
        expect(getByText(/Spread/)).toBeInTheDocument();
        expect(getOrderbookSocketMocked).toBeCalledTimes(2);
    });
})


