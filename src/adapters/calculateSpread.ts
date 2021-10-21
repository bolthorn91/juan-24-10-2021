import { ISpreadObject } from 'domain/types/types';

export const calculateSpread = (bidPrice: number, askPrice: number): ISpreadObject  => {
    const _spread = askPrice - bidPrice
    const spreadDecimal = _spread * 100;
    const spreadTotal = +(spreadDecimal * 10).toFixed(2)
    const spreadPercentage = +(spreadDecimal / askPrice).toFixed(2)
    return {
        total: spreadTotal, 
        percentage: spreadPercentage
    }
}
