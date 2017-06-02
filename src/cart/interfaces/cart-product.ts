import { OrderCurrency } from "../../order/enums/currency";

export interface CartProduct {
	productId: string;
	quantity: number;
	price: number;
	currency: OrderCurrency;
}