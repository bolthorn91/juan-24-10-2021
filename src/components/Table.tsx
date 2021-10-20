import { getTableRows } from 'adapters/getTableRows';
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
    const tableRows: ITableRow[] = getTableRows(orders);

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
