import { ITableRow } from 'domain/types/types';
import './Table.scss'

interface IProps {
    title: string;
    orders: number[][];
}

export const Table = ({
    title,
    orders
}: IProps) => {
    const headers = ['PRICE', 'SIZE', 'TOTAL'];
    let lastRow: ITableRow = {price: 0, size: 0, total: 0};

    const getTableRows = (_orders: number[][]) => _orders
        .reduce((acc, current, index) => {
            const currentRow: ITableRow = {
                price: current[0],
                size: current[1],
                total: current[1] + lastRow.total
            };
            if (acc.find(row => row.price === current[0])) {
                acc[acc.findIndex(row => row.price === current[0])] = currentRow;
                return [...acc];
            }
            return index === 0
                ? [currentRow]
                : [...acc, currentRow];
        }, [lastRow]);

    const tableRows: ITableRow[] = getTableRows(orders)

    return (
        <div className="table">
            <h1>{title}</h1>
            <div className="table__header">
                {headers.map(header => (
                    <h2 key={header}>{header}</h2>
                ))}
            </div>
            {tableRows.map((row, index) => (
                <div 
                    className="table__row"
                    key={index}
                >
                    <p>{row.price}</p>
                    <p>{row.size}</p>
                    <p>{row.total}</p>
                </div>
            ))}
        </div>
    )
}
