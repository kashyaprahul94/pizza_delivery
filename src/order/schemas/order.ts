import { Schema, SchemaDefinition } from "mongoose";

import { CustomerDocument } from "../../customer/models/customer";
import { CartDocument } from "../../cart/models/cart";
import { CheckoutDocument } from "../../checkout/models/checkout";

import { Address } from "./address";
import { OrderCurrency, OrderStatus, PaymentType } from "../enums/index";


export const Order: SchemaDefinition = {
	customerId: {
		type: Schema.Types.ObjectId,
		ref: CustomerDocument.ResourceName,
		required: true
	},
	cartId: {
		type: Schema.Types.ObjectId,
		ref: CartDocument.ResourceName,
		required: true
	},
	checkoutId: {
		type: Schema.Types.ObjectId,
		ref: CheckoutDocument.ResourceName,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	currency: {
		type: OrderCurrency,
		required: true
	},
	paymentType: {
		type: PaymentType,
		required: true
	},
	deliveryAddress: {
		type: Address,
		required: true
	},
	status: {
		type: OrderStatus,
		required: false,
	},
	expectedTime: {
		type: Date,
		required: false
	},
	placedAt: {
		type: Date,
		required: false
	}
};