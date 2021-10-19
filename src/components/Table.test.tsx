import { render } from '@testing-library/react'
import { Table } from './Table'

const bids = [
    [10, 2],
    [30, 4]
] as any
describe('Table', () => {
    test('should display 2 rows with price, size and total', () => {
        const { getByText, getAllByText }= render(<Table 
            title="Bids"
            orders={bids}
        />)
        expect(getByText(/10/)).toBeInTheDocument()
        expect(getAllByText(/2/).length).toBe(2)
        expect(getByText(/30/)).toBeInTheDocument()
        expect(getAllByText(/4/).length).toBe(2)
    })
    
})
