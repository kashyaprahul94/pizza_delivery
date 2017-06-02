import { SchemaDefinition } from "mongoose";

export const Category: SchemaDefinition = {
	name: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: false
	}
};
