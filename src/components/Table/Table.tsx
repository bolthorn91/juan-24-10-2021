import { ITableRow } from 'domain/types/types';
import './Table.scss'

interface IProps {
    title: string;
    rows: ITableRow[]
}

export const Table = ({
    title,
    rows
}: IProps) => {
    const headers = ['PRICE', 'SIZE', 'TOTAL'];

    return (
        <div className="table">
            <h1>{title}</h1>
            <div className="table__header">
                {headers.map(header => (
                    <h2 key={header}>{header}</h2>
                ))}
            </div>
            {rows.map((row, index) => (
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
