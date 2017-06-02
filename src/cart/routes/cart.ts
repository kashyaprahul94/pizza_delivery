import { Router, Request, Response } from "express";

import { Error } from "../../shared/error-handling/models/error";

import { Cart } from "../models/cart";
import { CartService } from "../services/cart";

export class CartRoute {

	public static BasePath: string = "/carts";

	private router: Router;
	private delegate: CartService;

	private constructor () {
		this.router = Router();
		this.delegate = new CartService();
	}

	public static create (): Router {
		const instance = new CartRoute();

		instance.router.post( "/", instance.create );
		instance.router.put( "/:cartId", instance.update );
		instance.router.delete( "/:cartId", instance.remove );

		instance.router.get( "/count", instance.count );

		instance.router.get( "/", instance.get );
		instance.router.get( "/:cartId", instance.getById );

		instance.router.post( "/:cartId/add-product", instance.addItem );
		instance.router.post( "/:cartId/remove-product", instance.removeItem );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Cart>req.body )
			.subscribe( ( cart: Cart ) => {
				res.header( "Location", ( cart as any )._id );
				res.status( 201 ).end();
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "cartId" ], <Cart>req.body )
			.subscribe( ( cart: Cart ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "cartId" ] )
			.subscribe( () => {
				res.status( 204 ).end();
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public count = ( req: Request, res: Response ): void => {
		this.delegate.count( req.query )
			.subscribe( ( count: number ) => {
				res.send( count );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public getAll = ( req: Request, res: Response ): void => {
		this.delegate.getAll()
			.subscribe( ( cart: Cart[] ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( cart: Cart[] ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "cartId" ] )
			.subscribe( ( cart: Cart ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( cart: Cart ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public addItem = ( req: Request, res: Response ): void => {
		this.delegate.addItem( req.params[ "cartId" ], req.body )
			.subscribe( ( cart: Cart ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};

	public removeItem = ( req: Request, res: Response ): void => {
		this.delegate.removeItem( req.params[ "cartId" ], req.body )
			.subscribe( ( cart: Cart ) => {
				res.send( cart );
			}, ( error: Error ) => {
				res.status( error.getStatusCode() ).send( error );
			})
		;
	};
}