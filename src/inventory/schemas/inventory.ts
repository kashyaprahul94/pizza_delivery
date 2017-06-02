import { Schema, SchemaDefinition } from "mongoose";

import { CategoryDocument } from "../../category/models/category";
import { ProductDocument } from "../../product/models/product";
import { OrderCurrency } from "../../order/enums/currency";


export const Inventory: SchemaDefinition = {
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: CategoryDocument.ResourceName,
		required: true
	},
	productId: {
		type: Schema.Types.ObjectId,
		ref: ProductDocument.ResourceName,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	currency: {
		type: OrderCurrency,
		required: true,
		defualt: OrderCurrency.Default
	}
};
