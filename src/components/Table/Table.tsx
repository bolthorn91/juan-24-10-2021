import { PRICE_COLORS } from 'domain/types/enums';
import { ITableRow } from 'domain/types/types';
import './Table.scss'

interface IProps {
    rows: ITableRow[]
    priceColor: PRICE_COLORS;
    headerVisibility?: boolean
}

export const Table = ({
    rows,
    priceColor,
    headerVisibility = true
}: IProps) => {
    const headers = ['PRICE', 'SIZE', 'TOTAL'];

    return (
        <div className="table">
            {headerVisibility && (
                <div className="table__header">
                    {headers.map(header => (
                        <h2 
                            key={header}
                            className="table__header-column"
                        >{header}</h2>
                    ))}
                </div>
            )}
            {rows.map((row, index) => (
                <div 
                    className="table__row"
                    key={index}
                >
                    <p className= {`table__row-column table__row-column--${priceColor}`}
                    >
                        {row.price}
                    </p>
                    <p className="table__row-column">{row.size}</p>
                    <p className="table__row-column">{row.total}</p>
                </div>
            ))}
        </div>
    )
}
