import { Model } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Checkout } from "../models/checkout";


export class CheckoutRepository extends DocumentRepository<Checkout> {

	constructor ( model: Model<Checkout> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Checkout>;
	}

	public doCreate ( checkout: Checkout ): Observable<Checkout> {
		return Observable.create( ( observer: Subscriber<Checkout> ) => {
			super.create( checkout ).then( ( result: Checkout ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, checkout: Checkout ): Observable<Checkout> {
		return Observable.create( ( observer: Subscriber<Checkout> ) => {
			super.update( id, checkout ).exec().then( ( result: Checkout ) => {
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

	public getAll (): Observable<Checkout[]> {
		return Observable.create( ( observer: Subscriber<Checkout[]> ) => {
			super.findAll().exec().then( ( result: Checkout[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Checkout[]> {
		return Observable.create( ( observer: Subscriber<Checkout[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Checkout[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Checkout> {
		return Observable.create( ( observer: Subscriber<Checkout> ) => {
			super.findById( id ).exec().then( ( result: Checkout ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Checkout> {
		return Observable.create( ( observer: Subscriber<Checkout> ) => {
			super.findOne( condition ).exec().then( ( result: Checkout ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}
}

Object.seal( CheckoutRepository );