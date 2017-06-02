import { Observable } from "@reactivex/rxjs";

import { App } from "../../instance";

import { Checkout, CheckoutDocument } from "../models/checkout";
import { CheckoutRepository } from "./checkout-repo";

import { CustomerService } from "../../customer/services/customer";
import { CartService } from "../../cart/services/cart";
import { OrderService } from "../../order/services/order";

import { Order } from "../../order/models/order";
import { Order as IOrder, OrderCurrency, PaymentType } from "../../order/index";
import { Cart } from "../../cart/interfaces/cart";


export class CheckoutService {

	private repo: CheckoutRepository;

	private customerService: CustomerService;
	private cartService: CartService;
	private orderService: OrderService;

	public constructor () {

		this.repo = new CheckoutRepository( App.Instance().getModel( CheckoutDocument.ResourceKey ) );

		this.customerService = new CustomerService();
		this.cartService = new CartService();
		this.orderService = new OrderService();
	}

	public create = ( checkout: Checkout ): Observable<Checkout> => {
		return this.repo.doCreate( checkout )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkout: Checkout ): Checkout => {
				return checkout;
			})
			.flatMap( ( checkout: Checkout ): Observable<Checkout> => {
				return this.processOrder( checkout );
			} )
		;
	};

	public update = ( checkoutId: string, checkout: Checkout ): Observable<Checkout> => {
		return this.repo.doUpdate( checkoutId, checkout )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkout: Checkout ) => {
				return checkout;
			})
			;
	};

	public remove = ( checkoutId: string ): Observable<boolean> => {
		return this.repo.doRemove( checkoutId )
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

	public getAll = (  ): Observable<Checkout[]> => {
		return this.repo.getAll(  )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkouts: Checkout[] ) => {
				return checkouts;
			})
			;
	};

	public get = ( condition?: any ): Observable<Checkout[]> => {
		return this.repo.get( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkouts: Checkout[] ) => {
				return checkouts;
			})
			;
	};

	public getById = ( id: string ): Observable<Checkout> => {
		return this.repo.getById( id )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkout: Checkout ) => {
				return checkout;
			})
			;
	};

	public getOne = ( condition?: any ): Observable<Checkout> => {
		return this.repo.getOne( condition )
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkout: Checkout ) => {
				return checkout;
			})
		;
	};

	public processOrder = ( checkout: Checkout ): Observable<Checkout> => {

		const customerId: string = checkout.customerId;
		const cartId: string = checkout.cartId;

		const order: IOrder = {
			customerId: customerId,
			cartId: cartId,
			checkoutId: checkout._id,
			quantity: 0,
			total: 0,
			currency: OrderCurrency.Default,
			paymentType: PaymentType.Default,
			deliveryAddress: checkout.deliveryAddress
		};

		return this.cartService
			.getById( cartId )
			.flatMap( ( cart: Cart ): Observable<Order> => {
				order.total = cart.total;
				order.quantity = cart.quantity;
				return this.orderService.create( <Order>order );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( (  ) => {
				return checkout;
			})
		;
	}
}