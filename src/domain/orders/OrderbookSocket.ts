import { ISubscribeOrderbookDTO } from 'domain/types/dto';
import { MESSAGE_EVENTS, MESSAGE_FEEDS, MESSAGE_PRODUCT_IDS } from 'domain/types/enums';
import { IOrderbook, ISocketDataMessage } from 'domain/types/types';

export class OrderbookSocket {
    wsMessage: ISubscribeOrderbookDTO = {
        event: MESSAGE_EVENTS.SUBSCRIBE,
        feed: MESSAGE_FEEDS.BOOK,
        product_ids: [MESSAGE_PRODUCT_IDS.PI_XBTUSD]
    };
    ws: WebSocket |undefined;
    orderbook: IOrderbook | undefined;
    message: ISocketDataMessage | undefined;
    setOrderbook: Function;
    waiting = false;

    constructor(setOrderbook: Function) {
        this.setOrderbook = setOrderbook;
        this.initializeSocket(setOrderbook);
    }

    changeSocket(): void {
        const unsubscribeMessage: ISubscribeOrderbookDTO = {
            ...this.wsMessage,
            event: MESSAGE_EVENTS.UNSUBSCRIBE
        }
        this.wsMessage = {...unsubscribeMessage};
        this.ws?.send(JSON.stringify(this.wsMessage));
        const product_ids = this.wsMessage.product_ids[0] === MESSAGE_PRODUCT_IDS.PI_XBTUSD
            ? [MESSAGE_PRODUCT_IDS.PI_ETHUSD]
            : [MESSAGE_PRODUCT_IDS.PI_XBTUSD]
        const newSubscribeMessage: ISubscribeOrderbookDTO = {
            ...this.wsMessage,
            event: MESSAGE_EVENTS.SUBSCRIBE,
            product_ids
        }
        this.wsMessage = {...newSubscribeMessage};
        this.ws?.send(JSON.stringify(this.wsMessage))
        return;
    }

    initializeSocket(setOrderbook: Function) {
        this.ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
        this.ws.onopen = () => {
            this.ws?.send(JSON.stringify(this.wsMessage));
        }
        this.ws.onmessage = event => {
            const message: ISocketDataMessage = JSON.parse(event.data);
            this.message = message;
            if (message.feed === MESSAGE_FEEDS.BOOK_SNAPSHOT && message.numLevels === 25) {
                setOrderbook(message);
                this.orderbook = message;
            }
            this.throttle(() => this.handleSocketMessage(), 40);
        }
    }

    private handleSocketMessage(): void {
        if (this.message!.feed === MESSAGE_FEEDS.BOOK && this.orderbook) {
            if (this.message!.asks && this.message!.asks.length > 0) {
                const orders = this.updateOrderbook(this.message!.asks, this.orderbook.asks)
                    .sort((a, b) => b[0] - a[0])
                this.orderbook.asks = orders;
            }
            if (this.message!.bids && this.message!.bids.length > 0) {
                const orders = this.updateOrderbook(this.message!.bids, this.orderbook.bids)
                    .sort((a, b) => b[0] - a[0]);
                this.orderbook.bids = orders;
            }
            this.setOrderbook(JSON.parse(JSON.stringify(this.orderbook)))
        }
    }

    private updateOrderbook(messageOrders: number[][], orderbookOrders: number[][]): number[][] {
        messageOrders.map(messageOrder => {
            const orderbookIndex = orderbookOrders.findIndex(order => order[0] === messageOrder[0]);
            if (orderbookIndex && orderbookIndex > -1) {
                if (messageOrder[1] === 0) {
                    orderbookOrders.splice(orderbookIndex, 1);
                    return;
                }
                orderbookOrders[orderbookIndex] = messageOrder;
                return;
            }
            if (messageOrder[1] === 0) {
                return;
            }
            if (orderbookOrders.length >= 25) {
                orderbookOrders.pop();
                orderbookOrders.push(messageOrder);
                return;
            }
            orderbookOrders.push(messageOrder)
        })
        return orderbookOrders;
    }

    private throttle(callback: Function, limit: number) {
        if (!this.waiting) {
            callback();
            this.waiting = true;
            setTimeout(() => {
                this.waiting = false;
            }, limit);
        }
    }
}
