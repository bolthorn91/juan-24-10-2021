import { ISubscribeOrderbookDTO } from 'domain/types/dto';
import { ISocketDataMessage } from 'domain/types/types';

export const getOrderbookSocket = (setOrderbook: Function): WebSocket => {
    const wsMessage: ISubscribeOrderbookDTO = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD']
    }
    const ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
    ws.onopen = () => {
        ws.send(JSON.stringify(wsMessage))
    } 
    ws.onmessage = event => {
        const message: ISocketDataMessage = JSON.parse(event.data);
        if (message.feed === 'book_ui_1_snapshot' && message.numLevels === 25) {
            setOrderbook(message);
        }
    }
    return ws;
}
