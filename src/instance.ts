import { env } from "process";
import * as Mongoose from "mongoose";

import { Server } from "./server";
import { HTTP } from "./shared/networking/index";

import { Customer, CustomerDocument } from "./customer/models/index";
import { Category, CategoryDocument } from "./category/models/index";
import { Product, ProductDocument } from "./product/models/index";
import { Cart, CartDocument } from "./cart/models/index";
import { Order, OrderDocument } from "./order/models/index";
import { Inventory, InventoryDocument } from "./inventory/models/index";
import { Checkout, CheckoutDocument } from "./checkout/models/index";


export class App {

	private static _Instance: App = null;
	private static DefaultPort: number = env.PORT || env.VCAP_APP_PORT || 3001;
	private static MongoConnection: string = "mongodb://localhost:27017/pizza_delivery";

	private appServer: Server;
	private httpClient: HTTP;
	private db: Mongoose.Connection;
	private models: Map<string, Mongoose.Model<any>>;

	private constructor () {
		this.appServer = new Server();
		this.httpClient = new HTTP();
		this.initDB();
	}

	public static Instance (): App {
		if ( ! App._Instance ) {
			App._Instance = new App();
		}
		return App._Instance;
	}

	public getServer (): Server {
		return this.appServer;
	}

	public getHTTPClient (): HTTP {
		return this.httpClient;
	}

	private initDB (): void {
		this.db = Mongoose.createConnection( App.MongoConnection );
		this.initDBModels();
	}

	private initDBModels (): void {

		this.models = new Map<string, Mongoose.Model<any>>();

		const customer: CustomerDocument = new CustomerDocument();
		this.models.set( CustomerDocument.ResourceKey, this.db.model<Customer>( CustomerDocument.ResourceName, customer.getSchema(), CustomerDocument.CollectionName ) );

		const category: CategoryDocument = new CategoryDocument();
		this.models.set( CategoryDocument.ResourceKey, this.db.model<Category>( CategoryDocument.ResourceName, category.getSchema(), CategoryDocument.CollectionName ) );

		const product: ProductDocument = new ProductDocument();
		this.models.set( ProductDocument.ResourceKey, this.db.model<Product>( ProductDocument.ResourceName, product.getSchema(), ProductDocument.CollectionName ) );

		const cart: CartDocument = new CartDocument();
		this.models.set( CartDocument.ResourceKey, this.db.model<Cart>( CartDocument.ResourceName, cart.getSchema(), CartDocument.CollectionName ) );

		const order: OrderDocument = new OrderDocument();
		this.models.set( OrderDocument.ResourceKey, this.db.model<Order>( OrderDocument.ResourceName, order.getSchema(), OrderDocument.CollectionName ) );

		const inventory: InventoryDocument = new InventoryDocument();
		this.models.set( InventoryDocument.ResourceKey, this.db.model<Inventory>( InventoryDocument.ResourceName, inventory.getSchema(), InventoryDocument.CollectionName ) );

		const checkout: CheckoutDocument = new CheckoutDocument();
		this.models.set( CheckoutDocument.ResourceKey, this.db.model<Checkout>( CheckoutDocument.ResourceName, checkout.getSchema(), CheckoutDocument.CollectionName ) );

		Object.seal( this.models );
	}

	public getModel ( name: string ): Mongoose.Model<any> {
		return this.models.get( name );
	}


	private onServerStarted = (): void => {
		console.info( `\nServer is listening\n` );
	};

	public boot ( port?: number, hostname?: string, callback?: Function ) {
		this.appServer
			.withPort( port || App.DefaultPort )
			.boot( callback || this.onServerStarted )
		;
	}
}