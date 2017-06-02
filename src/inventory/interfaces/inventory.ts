import { OrderCurrency } from "../../order/enums/currency";

export interface Inventory {
	categoryId: string;
	productId: string;
	price: number;
	currency: OrderCurrency;
}