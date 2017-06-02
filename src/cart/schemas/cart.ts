import { Schema, SchemaDefinition } from "mongoose";

import { CustomerDocument } from "../../customer/models/customer";

import { OrderCurrency } from "../../order/enums/index";
import { CartStatus } from "../enums/status";
import { CartProduct } from "./cart-product";


export const Cart: SchemaDefinition = {
	customerId: {
		type: Schema.Types.ObjectId,
		ref: CustomerDocument.ResourceName,
		required: true
	},
	quantity: {
		type: Number,
		required: false
	},
	total: {
		type: Number,
		required: false
	},
	currency: {
		type: OrderCurrency,
		required: false,
		defualt: OrderCurrency.Default
	},
	products: {
		type: [ CartProduct ],
		required: false
	},
	status: {
		type: CartStatus,
		required: false
	},
};