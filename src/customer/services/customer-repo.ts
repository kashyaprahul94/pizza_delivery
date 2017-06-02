import { Model } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Customer } from "../models/customer";


export class CustomerRepository extends DocumentRepository<Customer> {

	constructor ( model: Model<Customer> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Customer>;
	}

	public doCreate ( customer: Customer ): Observable<Customer> {
		return Observable.create( ( observer: Subscriber<Customer> ) => {
			super.create( customer ).then( ( result: Customer ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, customer: Customer ): Observable<Customer> {
		return Observable.create( ( observer: Subscriber<Customer> ) => {
			super.update( id, customer ).exec().then( ( result: Customer ) => {
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

	public getAll (): Observable<Customer[]> {
		return Observable.create( ( observer: Subscriber<Customer[]> ) => {
			super.findAll().exec().then( ( result: Customer[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Customer[]> {
		return Observable.create( ( observer: Subscriber<Customer[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Customer[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Customer> {
		return Observable.create( ( observer: Subscriber<Customer> ) => {
			super.findById( id ).exec().then( ( result: Customer ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Customer> {
		return Observable.create( ( observer: Subscriber<Customer> ) => {
			super.findOne( condition ).exec().then( ( result: Customer ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}
}

Object.seal( CustomerRepository );