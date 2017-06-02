import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { Customer as ICustomer } from "../interfaces/customer";
import { Customer as CustomerSchema } from "../schemas/customer"


export interface Customer extends Base, ICustomer {

}

export class CustomerDocument extends BaseDocument {

	public static ResourceKey: string = "__customer__";
	public static ResourceName: string = "Customer";
	public static CollectionName: string = "Customers";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( CustomerSchema );
	}

	protected initHooks (): void {
		super.initHooks();
	}

	protected decorateSchema (): void {
		super.decorateSchema();
	}

	protected associations (): void {
		super.associations();
		this.schema.methods.fullName = function(): string {
			return [ this.firstName.trim(), this.lastName.trim() ].join( " " );
		};
	}
}