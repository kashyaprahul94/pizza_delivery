import { SchemaDefinition } from "mongoose";

export const Customer: SchemaDefinition = {
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
};
