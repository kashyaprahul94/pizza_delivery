import { Router, Request, Response } from "express";

import { Category } from "../models/category";
import { CategoryService } from "../services/category";

export class CategoryRoute {

	public static BasePath: string = "/categories";

	private router: Router;
	private delegate: CategoryService;

	private constructor () {
		this.router = Router();
		this.delegate = new CategoryService();
	}

	public static create (): Router {
		const instance = new CategoryRoute();

		instance.router.post( "/", instance.create );
		instance.router.put( "/:categoryId", instance.update );
		instance.router.delete( "/:categoryId", instance.remove );

		instance.router.get( "/count", instance.count );

		instance.router.get( "/", instance.get );
		instance.router.get( "/:categoryId", instance.getById );

		return instance.router;
	}


	public create = ( req: Request, res: Response ): void => {
		this.delegate.create( <Category>req.body )
			.subscribe( ( category: Category ) => {
				res.header( "Location", ( category as any )._id );
				res.status( 201 ).end();
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public update = ( req: Request, res: Response ): void => {
		this.delegate.update( req.params[ "categoryId" ], <Category>req.body )
			.subscribe( ( category: Category ) => {
				res.send( category );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public remove = ( req: Request, res: Response ): void => {
		this.delegate.remove( req.params[ "categoryId" ] )
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
			.subscribe( ( category: Category[] ) => {
				res.send( category );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public get = ( req: Request, res: Response ): void => {
		this.delegate.get( req.query )
			.subscribe( ( category: Category[] ) => {
				res.send( category );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getById = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.params[ "categoryId" ] )
			.subscribe( ( category: Category ) => {
				res.send( category );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};

	public getOne = ( req: Request, res: Response ): void => {
		this.delegate.getById( req.query )
			.subscribe( ( category: Category ) => {
				res.send( category );
			}, ( error ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}