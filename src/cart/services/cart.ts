import * as _ from "lodash";
import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";
import { Error as MongoError } from "mongoose";
import { Error, StatusCode } from "../../shared/error-handling/index";

import { CartProduct } from "../interfaces/index";
import { Cart, CartDocument } from "../models/cart";
import { CartRepository } from "./cart-repo";


export class CartService {

	private repo: CartRepository;

	public constructor () {
		this.repo = new CartRepository( App.Instance().getModel( CartDocument.ResourceKey ) );
	}

	public create = ( cart: Cart ): Observable<Cart> => {
		return this.repo.doCreate( cart )
			.catch( ( error: MongoError ): Observable<Error> => {
				return Observable.throw( new Error()
					.setStatusCode( StatusCode.BadRequest )
					.setName( error.name )
					.setDescription( error.message )
				);
			})
			.map( ( cart: Cart ) => {
				return cart;
			})
		;
	};

	public update = ( cartId: string, cart: Cart ): Observable<Cart> => {
		return this.repo.doUpdate( cartId, cart )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( cart: Cart ) => {
				return cart;
			})
		;
	};

	public remove = ( cartId: string ): Observable<boolean> => {
		return this.repo.doRemove( cartId )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( (  ) => {
				return true;
			})
		;
	};

	public count = ( condition: any ): Observable<number> => {
		return this.repo.doCount( condition )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( count: number ) => {
				return count;
			})
		;
	};

	public getAll = (  ): Observable<Cart[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( carts: Cart[] ) => {
				return carts;
			})
		;
	};

	public get = ( condition?: any ): Observable<Cart[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( carts: Cart[] ) => {
				return carts;
			})
		;
	};

	public getById = ( id: string ): Observable<Cart> => {
		return this.repo.getById( id )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( cart: Cart ) => {
				return cart;
			})
		;
	};

	public getOne = ( condition?: any ): Observable<Cart> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( cart: Cart ) => {
				return cart;
			})
		;
	};

	public addItem = ( cartId: string, product: CartProduct ): Observable<Cart> => {
		return this.repo.getById( cartId )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.flatMap( ( cart: Cart ): Observable<Cart> => {
				cart.products.push( product );
				return this.repo.doUpdate( cartId, cart );
			})
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( cart: Cart ) => {
				return cart;
			})
		;
	};

	public removeItem = ( cartId: string, product: CartProduct ): Observable<Cart> => {
		return this.repo.getById( cartId )
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.flatMap( ( cart: Cart ): Observable<Cart> => {
				const productIndex: number = _.findIndex( cart.products, {
					productId: product.productId
				} );
				cart.products.splice( productIndex, 1 );
				return Observable.of( cart );
			})
			.flatMap( ( cart: Cart ): Observable<Cart> => {
				return this.repo.doUpdate( cartId, cart );
			})
			.catch( ( error: any ): Observable<Error> => {
				return Observable.throw( error );
			})
			.map( ( cart: Cart ) => {
				return cart;
			})
		;
	};
}