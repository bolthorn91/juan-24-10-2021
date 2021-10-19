import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { App } from './App';
import { getOrderbookSocket as getOrderbookSocketMocked } from 'domain/orders/getOrderbookSocket';

const mockedOrderbook = {
    bids: [['::price1::', '::size2::']],
    asks: [['::price2::', '::size2::']]
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
        expect(getOrderbookSocketMocked).toBeCalledTimes(2);
    });
})


