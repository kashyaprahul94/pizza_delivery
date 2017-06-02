import { Router, Request, Response } from "express";

import { Customer } from "../models/customer";
import { CustomerService } from "../services/customer";

export class CustomerRoute {

	public static BasePath: string = "/customers";

	private router: Router;
	private delegate: CustomerService;

	private constructor () {
		this.router = Router();
		this.delegate = new CustomerService();
	}

	public static create (): Router {
		const instance = new CustomerRoute();

		instance.router.post( "/", instance.create );
		instance.router.put( "/:customerId", instance.update );
		instance.router.delete( "/:customerId", instance.remove );

		instance.router.get( "/count", instance.count );

		instance.router.get( "/", instance.get );
		instance.router.get( "/:customerId", instance.getById );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Customer>req.body )
			.subscribe( ( customer: Customer ) => {
				res.header( "Location", ( customer as any )._id );
				res.status( 201 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "customerId" ], <Customer>req.body )
			.subscribe( ( customer: Customer ) => {
				res.send( customer );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "customerId" ] )
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
			.subscribe( ( customer: Customer[] ) => {
				res.send( customer );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( customer: Customer[] ) => {
				res.send( customer );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "customerId" ] )
			.subscribe( ( customer: Customer ) => {
				res.send( customer );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( customer: Customer ) => {
				res.send( customer );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}