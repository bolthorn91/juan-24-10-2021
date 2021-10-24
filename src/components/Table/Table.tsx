import { PRICE_COLORS } from 'domain/types/enums';
import { ITableRow } from 'domain/types/types';
import './Table.scss'

interface IProps {
    rows: ITableRow[]
    priceColor: PRICE_COLORS;
    headerVisibility?: boolean;
    reverseColumns?: boolean;
}

export const Table = ({
    rows,
    priceColor,
    headerVisibility = true,
    reverseColumns
}: IProps) => {
    const headers = ['PRICE', 'SIZE', 'TOTAL'];
    if (reverseColumns) {
        headers.reverse();
    }
    const rowColumns = (row: ITableRow) => {
        let orderedRow = Object.values(row)
        let priceIndex = 0
        if (reverseColumns) {
            orderedRow = orderedRow.reverse();
            priceIndex = 2;
        }
        return (
            <>
                {orderedRow.map((column, index) => (
                    <p 
                        key={index}
                        className= {`
                        table__row-column 
                        ${priceColor && index === priceIndex ? `table__row-column--${priceColor}` : ''}
                    `}>
                        {column} 
                    </p>
                ))}
            </>
        )
    } 

    const calculateBackgroundWidth = (row: ITableRow): string => {
        const total = rows.reduce((acc, current) => Math.max(acc, current.total), 0);
        const rowPercentage = Math.round(((row.total * 100) / total)).toString() + '%';
        return rowPercentage;
    }

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
                <div className="table__row" key={index}>
                    <div
                        style={{width: calculateBackgroundWidth(row)}}
                        className={`
                            table__row-background
                            ${priceColor === PRICE_COLORS.GREEN 
                    ? 'table__row-background--green' 
                    : 'table__row-background--red'}
                            ${priceColor === PRICE_COLORS.GREEN && !reverseColumns
                    ? 'table__row-background--left' 
                    : ''}
                    `}>
                    </div>
                    {rowColumns(row)}
                </div>
            ))}
        </div>
    )
}
