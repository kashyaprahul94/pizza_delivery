import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";

import { Customer, CustomerDocument } from "../models/customer";
import { CustomerRepository } from "./customer-repo";


export class CustomerService {

	private repo: CustomerRepository;

	public constructor () {
		this.repo = new CustomerRepository( App.Instance().getModel( CustomerDocument.ResourceKey ) );
	}

	public create = ( customer: Customer ): Observable<Customer> => {
		return this.repo.doCreate( customer )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customer: Customer ) => {
				return customer;
			})
			;
	};

	public update = ( customerId: string, customer: Customer ): Observable<Customer> => {
		return this.repo.doUpdate( customerId, customer )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customer: Customer ) => {
				return customer;
			})
			;
	};

	public remove = ( customerId: string ): Observable<boolean> => {
		return this.repo.doRemove( customerId )
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

	public getAll = (  ): Observable<Customer[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customers: Customer[] ) => {
				return customers;
			})
			;
	};

	public get = ( condition?: any ): Observable<Customer[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customers: Customer[] ) => {
				return customers;
			})
			;
	};

	public getById = ( id: string ): Observable<Customer> => {
		return this.repo.getById( id )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customer: Customer ) => {
				return customer;
			})
			;
	};

	public getOne = ( condition?: any ): Observable<Customer> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customer: Customer ) => {
				return customer;
			})
			;
	};
}