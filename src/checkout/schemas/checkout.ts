import { Schema, SchemaDefinition } from "mongoose";

import { CustomerDocument } from "../../customer/models/customer";
import { CartDocument } from "../../cart/models/cart";

import { Address } from "../../order/schemas/address";

export const Checkout: SchemaDefinition = {
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
	deliveryAddress: {
		type: Address,
		required: true
	}
};
