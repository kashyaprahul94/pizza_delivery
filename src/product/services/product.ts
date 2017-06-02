import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";

import { Product, ProductDocument } from "../models/product";
import { ProductRepository } from "./product-repo";


export class ProductService {

	private repo: ProductRepository;

	public constructor () {
		this.repo = new ProductRepository( App.Instance().getModel( ProductDocument.ResourceKey ) );
	}

	public create = ( product: Product ): Observable<Product> => {
		return this.repo.doCreate( product )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( product: Product ) => {
				return product;
			})
			;
	};

	public update = ( productId: string, product: Product ): Observable<Product> => {
		return this.repo.doUpdate( productId, product )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( product: Product ) => {
				return product;
			})
			;
	};

	public remove = ( productId: string ): Observable<boolean> => {
		return this.repo.doRemove( productId )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( (  ) => {
				return true;
			})
			;
	};

	public count = ( condition: any ): Observable<number> => {
		return this.repo.doCount( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( count: number ) => {
				return count;
			})
			;
	};

	public getAll = (  ): Observable<Product[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( products: Product[] ) => {
				return products;
			})
			;
	};

	public get = ( condition?: any ): Observable<Product[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( products: Product[] ) => {
				return products;
			})
			;
	};

	public getById = ( id: string ): Observable<Product> => {
		return this.repo.getById( id )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( product: Product ) => {
				return product;
			})
			;
	};

	public getOne = ( condition?: any ): Observable<Product> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( product: Product ) => {
				return product;
			})
			;
	};
}