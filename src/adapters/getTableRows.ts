import { ITableRow } from 'domain/types/types';

export const getTableRows = (_orders: number[][]): ITableRow[] => {
    let lastRow: ITableRow = {price: 0, size: 0, total: 0};
    return _orders.reduce((acc, current, index) => {
        lastRow.total += current[1] + lastRow.size;
        const currentRow: ITableRow = {
            price: current[0],
            size: current[1],
            total: lastRow.total
        };
        if (index !== 0 && acc.find(row => row.price === current[0])) {
            acc[acc.findIndex(row => row.price === current[0])] = currentRow;
            return [...acc];
        }
        return index === 0
            ? [currentRow]
            : [...acc, currentRow];
    }, [lastRow]);
}
