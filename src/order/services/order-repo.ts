import { Model } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Order } from "../models/order";


export class OrderRepository extends DocumentRepository<Order> {

	constructor ( model: Model<Order> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Order>;
	}

	public doCreate ( order: Order ): Observable<Order> {
		return Observable.create( ( observer: Subscriber<Order> ) => {
			super.create( order ).then( ( result: Order ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, order: Order ): Observable<Order> {
		return Observable.create( ( observer: Subscriber<Order> ) => {
			super.update( id, order ).exec().then( ( result: Order ) => {
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

	public getAll (): Observable<Order[]> {
		return Observable.create( ( observer: Subscriber<Order[]> ) => {
			super.findAll().exec().then( ( result: Order[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Order[]> {
		return Observable.create( ( observer: Subscriber<Order[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Order[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Order> {
		return Observable.create( ( observer: Subscriber<Order> ) => {
			super.findById( id ).exec().then( ( result: Order ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Order> {
		return Observable.create( ( observer: Subscriber<Order> ) => {
			super.findOne( condition ).exec().then( ( result: Order ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}
}

Object.seal( OrderRepository );