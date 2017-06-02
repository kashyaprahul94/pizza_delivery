import { Schema, SchemaDefinition } from "mongoose";

import { ProductDocument } from "../../product/models/product";
import { OrderCurrency } from "../../order/enums/currency";

export const CartProduct: SchemaDefinition = {
	productId: {
		type: Schema.Types.ObjectId,
		ref: ProductDocument.ResourceName,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: false
	},
	currency: {
		type: OrderCurrency,
		required: true
	}
};
