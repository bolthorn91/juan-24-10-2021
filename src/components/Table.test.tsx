import { render } from '@testing-library/react'
import { Table } from './Table'

const bids = [
    ['::price1::', '::size1::'],
    ['::price2::', '::size2::']
] as any
describe('Table', () => {
    test('should display 2 rows with price and size', () => {
        const { getByText }= render(<Table 
            title="Bids"
            orders={bids}
        />)   
        expect(getByText(/::price1::/)).toBeInTheDocument()
        expect(getByText(/::size1::/)).toBeInTheDocument()
        expect(getByText(/::price2::/)).toBeInTheDocument()
        expect(getByText(/::size2::/)).toBeInTheDocument()
    })
    
})
