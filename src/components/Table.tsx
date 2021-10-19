import './Table.scss'

interface IProps {
    title: string;
    orders: number[][];
}

export const Table = ({
    title,
    orders
}: IProps) => (
    <div className="table">
        <h1>{title}</h1>
        {orders.map((order, index) => (
            <div 
                className="table__row"
                key={index}
            >
                {order.map(value => (
                    <p key={value}>{value}</p>
                ))}
            </div>
        ))}
    </div>
)
