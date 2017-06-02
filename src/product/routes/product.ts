import { Router, Request, Response } from "express";

import { Product } from "../models/product";
import { ProductService } from "../services/product";

export class ProductRoute {

	public static BasePath: string = "/products";

	private router: Router;
	private delegate: ProductService;

	private constructor () {
		this.router = Router();
		this.delegate = new ProductService();
	}

	public static create (): Router {
		const instance = new ProductRoute();

		instance.router.post( "/", instance.create );
		instance.router.put( "/:productId", instance.update );
		instance.router.delete( "/:productId", instance.remove );

		instance.router.get( "/count", instance.count );

		instance.router.get( "/", instance.get );
		instance.router.get( "/:productId", instance.getById );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Product>req.body )
			.subscribe( ( product: Product ) => {
				res.header( "Location", ( product as any )._id );
				res.status( 201 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "productId" ], <Product>req.body )
			.subscribe( ( product: Product ) => {
				res.send( product );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "productId" ] )
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
			.subscribe( ( product: Product[] ) => {
				res.send( product );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( product: Product[] ) => {
				res.send( product );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "productId" ] )
			.subscribe( ( product: Product ) => {
				res.send( product );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( product: Product ) => {
				res.send( product );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}