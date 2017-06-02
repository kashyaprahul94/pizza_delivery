import { SchemaDefinition } from "mongoose";

export const Address: SchemaDefinition = {
	number: {
		type: String,
		required: true
	},
	line1: {
		type: String,
		required: true
	},
	line2: {
		type: String,
		required: false
	},
	country: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	postcode: {
		type: String,
		required: true
	}
};
