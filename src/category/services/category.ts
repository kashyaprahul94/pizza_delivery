import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";

import { Category, CategoryDocument } from "../models/category";
import { CategoryRepository } from "./category-repo";


export class CategoryService {

	private repo: CategoryRepository;

	public constructor () {
		this.repo = new CategoryRepository( App.Instance().getModel( CategoryDocument.ResourceKey ) );
	}

	public create = ( category: Category ): Observable<Category> => {
		return this.repo.doCreate( category )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( category: Category ) => {
				return category;
			})
		;
	};

	public update = ( categoryId: string, category: Category ): Observable<Category> => {
		return this.repo.doUpdate( categoryId, category )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( category: Category ) => {
				return category;
			})
		;
	};

	public remove = ( categoryId: string ): Observable<boolean> => {
		return this.repo.doRemove( categoryId )
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

	public getAll = (  ): Observable<Category[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( categorys: Category[] ) => {
				return categorys;
			})
		;
	};

	public get = ( condition?: any ): Observable<Category[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( categorys: Category[] ) => {
				return categorys;
			})
		;
	};

	public getById = ( id: string ): Observable<Category> => {
		return this.repo.getById( id )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( category: Category ) => {
				return category;
			})
		;
	};

	public getOne = ( condition?: any ): Observable<Category> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( category: Category ) => {
				return category;
			})
		;
	};
}