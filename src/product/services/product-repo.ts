import { Model } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Product } from "../models/product";


export class ProductRepository extends DocumentRepository<Product> {

	constructor ( model: Model<Product> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Product>;
	}

	public doCreate ( product: Product ): Observable<Product> {
		return Observable.create( ( observer: Subscriber<Product> ) => {
			super.create( product ).then( ( result: Product ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, product: Product ): Observable<Product> {
		return Observable.create( ( observer: Subscriber<Product> ) => {
			super.update( id, product ).exec().then( ( result: Product ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doRemove ( id: string ): Observable<void> {
		return Observable.create( ( observer: Subscriber<void> ) => {
			super.remove( id ).exec().then( () => {
				observer.next();
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doCount ( condition: any ): Observable<number> {
		return Observable.create( ( observer: Subscriber<number> ) => {
			super.count( condition ).exec().then( ( result: number ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getAll (): Observable<Product[]> {
		return Observable.create( ( observer: Subscriber<Product[]> ) => {
			super.findAll().exec().then( ( result: Product[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Product[]> {
		return Observable.create( ( observer: Subscriber<Product[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Product[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Product> {
		return Observable.create( ( observer: Subscriber<Product> ) => {
			super.findById( id ).exec().then( ( result: Product ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Product> {
		return Observable.create( ( observer: Subscriber<Product> ) => {
			super.findOne( condition ).exec().then( ( result: Product ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}
}

Object.seal( ProductRepository );