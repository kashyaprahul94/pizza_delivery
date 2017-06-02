import { Router, Request, Response } from "express";

import { Order } from "../models/order";
import { OrderService } from "../services/order";

export class OrderRoute {

	public static BasePath: string = "/orders";

	private router: Router;
	private delegate: OrderService;

	private constructor () {
		this.router = Router();
		this.delegate = new OrderService();
	}

	public static create (): Router {
		const instance = new OrderRoute();

		instance.router.post( "/", instance.create );
		instance.router.put( "/:orderId", instance.update );
		instance.router.delete( "/:orderId", instance.remove );

		instance.router.get( "/count", instance.count );

		instance.router.get( "/", instance.get );
		instance.router.get( "/:orderId", instance.getById );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Order>req.body )
			.subscribe( ( order: Order ) => {
				res.header( "Location", ( order as any )._id );
				res.status( 201 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "orderId" ], <Order>req.body )
			.subscribe( ( order: Order ) => {
				res.send( order );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "orderId" ] )
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
			.subscribe( ( order: Order[] ) => {
				res.send( order );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( order: Order[] ) => {
				res.send( order );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "orderId" ] )
			.subscribe( ( order: Order ) => {
				res.send( order );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( order: Order ) => {
				res.send( order );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}