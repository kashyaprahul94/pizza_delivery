import { Model } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Inventory } from "../models/inventory";


export class InventoryRepository extends DocumentRepository<Inventory> {

	constructor ( model: Model<Inventory> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Inventory>;
	}

	public doCreate ( inventory: Inventory ): Observable<Inventory> {
		return Observable.create( ( observer: Subscriber<Inventory> ) => {
			super.create( inventory ).then( ( result: Inventory ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, inventory: Inventory ): Observable<Inventory> {
		return Observable.create( ( observer: Subscriber<Inventory> ) => {
			super.update( id, inventory ).exec().then( ( result: Inventory ) => {
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

	public getAll (): Observable<Inventory[]> {
		return Observable.create( ( observer: Subscriber<Inventory[]> ) => {
			super.findAll().exec().then( ( result: Inventory[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Inventory[]> {
		return Observable.create( ( observer: Subscriber<Inventory[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Inventory[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Inventory> {
		return Observable.create( ( observer: Subscriber<Inventory> ) => {
			super.findById( id ).exec().then( ( result: Inventory ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Inventory> {
		return Observable.create( ( observer: Subscriber<Inventory> ) => {
			super.findOne( condition ).exec().then( ( result: Inventory ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}
}

Object.seal( InventoryRepository );