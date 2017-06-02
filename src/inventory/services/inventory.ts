import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";

import { Inventory, InventoryDocument } from "../models/inventory";
import { InventoryRepository } from "./inventory-repo";


export class InventoryService {

	private repo: InventoryRepository;

	public constructor () {
		this.repo = new InventoryRepository( App.Instance().getModel( InventoryDocument.ResourceKey ) );
	}

	public create = ( inventory: Inventory ): Observable<Inventory> => {
		return this.repo.doCreate( inventory )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventory: Inventory ) => {
				return inventory;
			})
			;
	};

	public update = ( inventoryId: string, inventory: Inventory ): Observable<Inventory> => {
		return this.repo.doUpdate( inventoryId, inventory )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventory: Inventory ) => {
				return inventory;
			})
			;
	};

	public remove = ( inventoryId: string ): Observable<boolean> => {
		return this.repo.doRemove( inventoryId )
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

	public getAll = (  ): Observable<Inventory[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventorys: Inventory[] ) => {
				return inventorys;
			})
			;
	};

	public get = ( condition?: any ): Observable<Inventory[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventorys: Inventory[] ) => {
				return inventorys;
			})
		;
	};

	public getById = ( id: string ): Observable<Inventory> => {
		return this.repo.getById( id )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventory: Inventory ) => {
				return inventory;
			})
			;
	};

	public getOne = ( condition?: any ): Observable<Inventory> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventory: Inventory ) => {
				return inventory;
			})
		;
	};

	public getByCategoryId = ( categoryId: string ): Observable<Inventory[]> => {
		return this.get( {
			categoryId: categoryId
		} );
	};
}