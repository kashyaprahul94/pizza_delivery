import * as _ from "lodash";
import { Schema, SchemaDefinition, Document } from "mongoose";

import { Base as IBase } from "../interfaces/base";
import { Base as BaseSchema } from "../schemas/base";

export interface Base extends IBase, Document {
	_id: string;
	id?: string;
}

export class BaseDocument {

	protected schema: Schema;

	constructor () {
		this.schema = new Schema( BaseSchema );
	}

	protected initSchema ( schema?: SchemaDefinition ): void {
		this.schema = new Schema( _.merge( schema || {}, BaseSchema ) );
	}

	protected initHooks (): void {
		this.schema.pre( "save", function ( next: Function ) {
			if ( this ) {
				const now: Date = new Date();
				if ( ! this.createdAt ) {
					this.createdAt = now
				}
				this.modifiedAt = now;
			}
			next();
			return this;
		});
	}

	protected decorateSchema (): void {

		this.schema.virtual( "id" ).get( function () {
			if ( this._id ) {
				return this._id.toHexString();
			}
		});

		this.schema.set( "toJSON", {
			virtuals: true,
			transform: function ( doc: any, ret: any, game:any ) {
				delete ret._id;
				delete ret.__v;
			}
		});

		this.schema.set( "toObject", {
			virtuals: true,
			transform: function ( doc: any, ret: any, game:any ) {
				delete ret._id;
				delete ret.__v;
			}
		});
	}

	protected associations (): void {

	}

	public getSchema (): Schema {
		return this.schema;
	}
}