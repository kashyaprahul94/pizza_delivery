import { Address } from "./address";
import { OrderStatus, OrderCurrency, PaymentType } from "../enums/index";

export interface Order {
	customerId: string;
	cartId: string;
	checkoutId: string;
	quantity: number;
	total: number;
	currency: OrderCurrency;
	paymentType: PaymentType;
	deliveryAddress: Address;
	status?: OrderStatus;
	expectedTime?: Date;
	placedAt?: Date;
}