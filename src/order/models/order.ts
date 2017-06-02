import * as Moment from "moment";
import { Base, BaseDocument } from "../../shared/mongo/models/base";

import { OrderStatus } from "../enums/status";
import { Order as IOrder } from "../interfaces/order";
import { Order as OrderSchema } from "../schemas/order";


export interface Order extends Base, IOrder {

}

export class OrderDocument extends BaseDocument {

	public static ResourceKey: string = "__order__";
	public static ResourceName: string = "Order";
	public static CollectionName: string = "Orders";

	constructor () {
		super();
		this.initSchema();
		this.initHooks();
		this.decorateSchema();
		this.associations();
	}

	protected initSchema (): void {
		super.initSchema( OrderSchema );
	}

	protected initHooks (): void {
		const self = this;
		this.schema.pre( "save", function ( next: Function ) {
			if ( this ) {
				const now: Date = new Date();
				if ( ! this.createdAt ) {
					this.createdAt = now
				}
				this.modifiedAt = now;
				this.status = OrderStatus.Default;
				this.placedAt = now;
				this.expectedTime = Moment( now ).add( 40, "minutes" ).toDate();
			}
			next();
			return this;
		});
	}

	protected decorateSchema (): void {
		super.decorateSchema();
	}

	protected associations (): void {
		super.associations();
	}
}