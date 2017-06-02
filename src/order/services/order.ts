import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";

import { Order, OrderDocument } from "../models/order";
import { OrderRepository } from "./order-repo";


export class OrderService {

	private repo: OrderRepository;

	public constructor () {
		this.repo = new OrderRepository( App.Instance().getModel( OrderDocument.ResourceKey ) );
	}

	public create = ( order: Order ): Observable<Order> => {
		return this.repo.doCreate( order )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( order: Order ) => {
				return order;
			})
			;
	};

	public update = ( orderId: string, order: Order ): Observable<Order> => {
		return this.repo.doUpdate( orderId, order )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( order: Order ) => {
				return order;
			})
			;
	};

	public remove = ( orderId: string ): Observable<boolean> => {
		return this.repo.doRemove( orderId )
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

	public getAll = (  ): Observable<Order[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( orders: Order[] ) => {
				return orders;
			})
			;
	};

	public get = ( condition?: any ): Observable<Order[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( orders: Order[] ) => {
				return orders;
			})
			;
	};

	public getById = ( id: string ): Observable<Order> => {
		return this.repo.getById( id )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( order: Order ) => {
				return order;
			})
			;
	};

	public getOne = ( condition?: any ): Observable<Order> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( order: Order ) => {
				return order;
			})
			;
	};
}