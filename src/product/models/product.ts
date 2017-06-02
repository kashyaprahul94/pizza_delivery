import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { Product as IProduct } from "../interfaces/product";
import { Product as ProductSchema } from "../schemas/product"


export interface Product extends Base, IProduct {

}

export class ProductDocument extends BaseDocument {

	public static ResourceKey: string = "__product__";
	public static ResourceName: string = "Product";
	public static CollectionName: string = "Products";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( ProductSchema );
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