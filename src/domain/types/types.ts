export interface IOrderbook {
    asks: number[][];
    bids: number[][];
    feed: string;
    numLevels?: number;
    product_id: string;
}

export interface ISocketDataMessage {
    asks: number[][];
    bids: number[][];
    feed: string;
    numLevels?: number;
    product_id: string;
    event?: string;
}


