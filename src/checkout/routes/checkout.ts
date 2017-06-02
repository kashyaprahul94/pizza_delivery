import { Router, Request, Response } from "express";

import { Checkout } from "../models/checkout";
import { CheckoutService } from "../services/checkout";

export class CheckoutRoute {

	public static BasePath: string = "/checkout";

	private router: Router;
	private delegate: CheckoutService;

	private constructor () {
		this.router = Router();
		this.delegate = new CheckoutService();
	}

	public static create (): Router {
		const instance = new CheckoutRoute();

		instance.router.post( "/", instance.create );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Checkout>req.body )
			.subscribe( ( checkout: Checkout ) => {
				res.header( "Location", checkout._id );
				res.status( 201 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "checkoutId" ], <Checkout>req.body )
			.subscribe( ( checkout: Checkout ) => {
				res.send( checkout );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "checkoutId" ] )
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
			.subscribe( ( checkout: Checkout[] ) => {
				res.send( checkout );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( checkout: Checkout[] ) => {
				res.send( checkout );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "checkoutId" ] )
			.subscribe( ( checkout: Checkout ) => {
				res.send( checkout );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( checkout: Checkout ) => {
				res.send( checkout );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}