import { calculateSpread } from './calculateSpread'

describe('calculateSpread', () => {
    test('should return spread object interface', () => {
        const bid = 1000
        const ask = 1005
        expect(calculateSpread(bid, ask)).toEqual({
            total: 5000,
            percentage: 0.5
        })
    })
    test('should return spread object properties two decimals fixed and rounded', () => {
        const bid = 1000.12
        const ask = 1005
        expect(calculateSpread(bid, ask)).toEqual({
            total: 4880,
            percentage: 0.49
        })
    })
})
