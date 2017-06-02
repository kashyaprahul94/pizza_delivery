import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { Inventory as IInventory } from "../interfaces/inventory";
import { Inventory as InventorySchema } from "../schemas/inventory"


export interface Inventory extends Base, IInventory {

}

export class InventoryDocument extends BaseDocument {

	public static ResourceKey: string = "__inventory__";
	public static ResourceName: string = "Inventory";
	public static CollectionName: string = "Inventories";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( InventorySchema );
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