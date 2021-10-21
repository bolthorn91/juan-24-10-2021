import { ISubscribeOrderbookDTO } from 'domain/types/dto';
import { MESSAGE_EVENTS, MESSAGE_FEEDS, MESSAGE_PRODUCT_IDS } from 'domain/types/enums';
import { ISocketDataMessage } from 'domain/types/types';

export const getOrderbookSocket = (setOrderbook: Function): WebSocket => {
    const wsMessage: ISubscribeOrderbookDTO = {
        event: MESSAGE_EVENTS.SUBSCRIBE,
        feed: MESSAGE_FEEDS.BOOK,
        product_ids: [MESSAGE_PRODUCT_IDS.PI_XBTUSD]
    }
    const ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
    ws.onopen = () => {
        ws.send(JSON.stringify(wsMessage))
    } 
    ws.onmessage = event => {
        const message: ISocketDataMessage = JSON.parse(event.data);
        if (message.feed === MESSAGE_FEEDS.BOOK_SNAPSHOT && message.numLevels === 25) {
            message.asks.reverse()
            setOrderbook(message);
        }
    }
    return ws;
}
