import { Schema, SchemaDefinition } from "mongoose";

import { CategoryDocument } from "../../category/models/category";

export const Product: SchemaDefinition = {
	name: {
		type: String,
		required: true
	},
	sku: {
		type: String,
		required: false
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: CategoryDocument.ResourceName,
		required: true
	}
};
