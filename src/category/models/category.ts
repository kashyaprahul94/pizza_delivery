import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { Category as ICategory } from "../interfaces/category";
import { Category as CategorySchema } from "../schemas/category";


export interface Category extends Base, ICategory {

}

export class CategoryDocument extends BaseDocument {

	public static ResourceKey: string = "__category__";
	public static ResourceName: string = "Category";
	public static CollectionName: string = "Categories";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( CategorySchema );
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