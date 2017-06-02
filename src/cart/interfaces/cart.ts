import { OrderCurrency } from "../../order/enums/currency";

import { CartProduct } from "./cart-product";
import { CartStatus } from "../enums/status";

export interface Cart {
	customerId: string;
	products?: CartProduct[];
	quantity?: number;
	total?: number;
	currency?: OrderCurrency;
	status?: CartStatus;
}