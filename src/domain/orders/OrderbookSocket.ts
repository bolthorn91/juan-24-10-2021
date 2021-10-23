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

    constructor(setOrderbook: Function) {
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
            this.ws?.send(JSON.stringify(this.wsMessage))
        }
        this.ws.onmessage = event => {
            const message: ISocketDataMessage = JSON.parse(event.data);
            if (message.feed === MESSAGE_FEEDS.BOOK_SNAPSHOT && message.numLevels === 25) {
                message.asks.reverse();
                setOrderbook(message);
                this.orderbook = message;
            }
            this.throttle(() => {
                if (message.feed === MESSAGE_FEEDS.BOOK && this.orderbook) {
                    this.orderbook = this.handleSocketMessage(message, this.orderbook!)
                }
                setOrderbook(this.orderbook)

            }, 300)
        }
    }

    private handleSocketMessage(message: ISocketDataMessage, orderbook: IOrderbook): IOrderbook {
        const updateOrderbook = (messageOrders: number[][], orderbookOrders: number[][]): number[][] => {
            messageOrders.forEach(messageOrder => {
                const orderbookIndex = orderbookOrders.findIndex(order => order[0] === messageOrder[0])
                if (orderbookIndex && orderbookIndex > -1) {
                    if (messageOrder[1] === 0) {
                        orderbookOrders.splice(orderbookIndex, 1);
                        return;
                    }
                    orderbookOrders[orderbookIndex] = messageOrder
                    return;
                }
                orderbookOrders.push(messageOrder);
            })
            return orderbookOrders;

        }
        if (message.asks && message.asks.length > 0) {
            orderbook.asks = updateOrderbook(message.asks, orderbook.asks);
        }
        if (message.bids && message.bids.length > 0) {
            orderbook.bids = updateOrderbook(message.bids, orderbook.bids);
        }
        return orderbook;
    }

    private throttle(callback: Function, limit: number) {
        var waiting = false;
        return (...args: any[]) => {
            if (!waiting) {
                callback(...args);
                waiting = true;
                setTimeout(function () {
                    waiting = false;
                }, limit);
            }
        }
    }
}
