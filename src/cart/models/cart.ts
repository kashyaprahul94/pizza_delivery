import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { Cart as ICart } from "../interfaces/cart";
import { Cart as CartSchema } from "../schemas/cart";


export interface Cart extends Base, ICart {

}

export class CartDocument extends BaseDocument {

	public static ResourceKey: string = "__cart__";
	public static ResourceName: string = "Cart";
	public static CollectionName: string = "Carts";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( CartSchema );
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