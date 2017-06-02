import { SchemaDefinition } from "mongoose";

export const Base: SchemaDefinition = {
	createdAt: {
		type: Date,
		required: false
	},
	modifiedAt: {
		type: Date,
		required: false
	}
};