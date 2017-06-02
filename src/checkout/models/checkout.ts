import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { Checkout as ICheckout } from "../interfaces/checkout";
import { Checkout as CheckoutSchema } from "../schemas/checkout"


export interface Checkout extends Base, ICheckout {

}

export class CheckoutDocument extends BaseDocument {

	public static ResourceKey: string = "__checkout__";
	public static ResourceName: string = "Checkout";
	public static CollectionName: string = "Checkouts";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( CheckoutSchema );
	}

	protected initHooks (): void {
		super.initHooks();
	}

	protected decorateSchema (): void {
		super.decorateSchema();
	}

	protected associations (): void {
		super.associations();
	}
}