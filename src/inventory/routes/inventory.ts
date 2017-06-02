import { Router, Request, Response } from "express";

import { Inventory } from "../models/inventory";
import { InventoryService } from "../services/inventory";

export class InventoryRoute {

	public static BasePath: string = "/inventory";

	private router: Router;
	private delegate: InventoryService;

	private constructor () {
		this.router = Router();
		this.delegate = new InventoryService();
	}

	public static create (): Router {
		const instance = new InventoryRoute();

		instance.router.post( "/", instance.create );
		instance.router.put( "/:inventoryId", instance.update );
		instance.router.delete( "/:inventoryId", instance.remove );

		instance.router.get( "/count", instance.count );

		instance.router.get( "/", instance.get );
		instance.router.get( "/:inventoryId", instance.getById );
		instance.router.get( "/category/:categoryId", instance.getByCategoryId );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Inventory>req.body )
			.subscribe( ( inventory: Inventory ) => {
				res.header( "Location", ( inventory as any )._id );
				res.status( 201 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "inventoryId" ], <Inventory>req.body )
			.subscribe( ( inventory: Inventory ) => {
				res.send( inventory );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "inventoryId" ] )
			.subscribe( () => {
				res.status( 204 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public count = ( req: Request, res: Response ): void => {
		this.delegate.count( req.query )
			.subscribe( ( count: number ) => {
				res.send( count );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getAll = ( req: Request, res: Response ): void => {
		this.delegate.getAll()
			.subscribe( ( inventory: Inventory[] ) => {
				res.send( inventory );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( inventory: Inventory[] ) => {
				res.send( inventory );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "inventoryId" ] )
			.subscribe( ( inventory: Inventory ) => {
				res.send( inventory );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( inventory: Inventory ) => {
				res.send( inventory );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getByCategoryId = ( req: Request, res: Response ): void => {
		this.delegate.getByCategoryId( req.params[ "categoryId" ] )
			.subscribe( ( inventory: Inventory[] ) => {
				res.send( inventory );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}