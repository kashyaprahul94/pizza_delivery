import * as _ from "lodash";
import { Model, Error } from "mongoose";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { DocumentRepository } from "../../shared/mongo/services/document-repository";

import { Cart } from "../models/cart";
import { CartProduct } from "../interfaces/cart-product";


export class CartRepository extends DocumentRepository<Cart> {

	constructor ( model: Model<Cart> ) {
		super( model );
	}

	public getModel (): Model<any> {
		return super.getModel() as Model<Cart>;
	}

	public doCreate ( cart: Cart ): Observable<Cart> {
		return Observable.create( ( observer: Subscriber<Cart> ) => {
			super.create( CartRepository.updateCartItems( cart ) ).then( ( result: Cart ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public doUpdate ( id: string, cart: Cart ): Observable<Cart> {
		return Observable.create( ( observer: Subscriber<Cart> ) => {
			super.update( id, CartRepository.updateCartItems( cart ) ).exec().then( ( result: Cart ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public doRemove ( id: string ): Observable<void> {
		return Observable.create( ( observer: Subscriber<void> ) => {
			super.remove( id ).exec().then( () => {
				observer.next();
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public doCount ( condition: any ): Observable<number> {
		return Observable.create( ( observer: Subscriber<number> ) => {
			super.count( condition ).exec().then( ( result: number ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public getAll (): Observable<Cart[]> {
		return Observable.create( ( observer: Subscriber<Cart[]> ) => {
			super.findAll().exec().then( ( result: Cart[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public get ( condition?: any, fields?: any, options?: any ): Observable<Cart[]> {
		return Observable.create( ( observer: Subscriber<Cart[]> ) => {
			super.find( condition, fields, options ).exec().then( ( result: Cart[] ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public getById ( id: string ): Observable<Cart> {
		return Observable.create( ( observer: Subscriber<Cart> ) => {
			super.findById( id ).exec().then( ( result: Cart ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}

	public getOne ( condition: any ): Observable<Cart> {
		return Observable.create( ( observer: Subscriber<Cart> ) => {
			super.findOne( condition ).exec().then( ( result: Cart ) => {
				observer.next( result );
				observer.complete();
			}, ( error: Error ) => {
				observer.error( error );
			});
		});
	}



	private static updateCartItems ( cart: Cart ): Cart {
		cart.quantity = _.sumBy( cart.products, "quantity" );
		cart.total = _.sumBy( cart.products, ( product: CartProduct ) => {
			return ( product.quantity * product.price );
		});
		return cart;
	}
}

Object.seal( CartRepository );