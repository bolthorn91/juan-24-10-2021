import { getTableRows } from 'adapters/getTableRows';
const orders = [
    [100, 1],
    [200, 3],
    [300, 5]
]
describe('getTableRows', () => {
    test('should return table eow format', () => {
        const result =  getTableRows(orders);
        expect(result).toStrictEqual([
            {
                price: 100,
                size: 1,
                total: 1
            },
            {
                price: 200,
                size: 3,
                total: 4
            },
            {
                price: 300,
                size: 5,
                total: 9
            }
        ]);
    });
})
