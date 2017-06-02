import { Address } from "../../order/interfaces/address";

export interface Checkout {
	customerId: string;
	cartId: string;
	deliveryAddress: Address;
}