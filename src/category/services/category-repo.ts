import { Model } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Category } from "../models/category";


export class CategoryRepository extends DocumentRepository<Category> {

	constructor ( model: Model<Category> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Category>;
	}

	public doCreate ( category: Category ): Observable<Category> {
		return Observable.create( ( observer: Subscriber<Category> ) => {
			super.create( category ).then( ( result: Category ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, category: Category ): Observable<Category> {
		return Observable.create( ( observer: Subscriber<Category> ) => {
			super.update( id, category ).exec().then( ( result: Category ) => {
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

	public getAll (): Observable<Category[]> {
		return Observable.create( ( observer: Subscriber<Category[]> ) => {
			super.findAll().exec().then( ( result: Category[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Category[]> {
		return Observable.create( ( observer: Subscriber<Category[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Category[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Category> {
		return Observable.create( ( observer: Subscriber<Category> ) => {
			super.findById( id ).exec().then( ( result: Category ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Category> {
		return Observable.create( ( observer: Subscriber<Category> ) => {
			super.findOne( condition ).exec().then( ( result: Category ) => {
				observer.next( result );
				observer.complete();
			}, ( error: any ) => {
				observer.error( error );
			});
		});
	}
}

Object.seal( CategoryRepository );