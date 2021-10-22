import { render } from '@testing-library/react'
import { Table } from './Table'

const bids = [
    {
        price: 1,
        size: 1,
        total: 1
    },
    {
        price: 2,
        size: 3,
        total: 4
    }
] as any
describe('Table', () => {
    test('should display 2 rows with price, size and total', () => {
        const { getByText, getAllByText }= render(<Table 
            rows={bids}
            priceColor={'green' as any}
        />)
        expect(getAllByText(/1/)[0]).toBeInTheDocument()
        expect(getAllByText(/1/).length).toBe(3)
        expect(getByText(/2/)).toBeInTheDocument()
        expect(getByText(/3/)).toBeInTheDocument()
        expect(getByText(/4/)).toBeInTheDocument()
    })
    
})
