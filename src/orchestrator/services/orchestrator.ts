import { Observable } from "@reactivex/rxjs";

import { CustomerService } from "../../customer/services/customer";
import { CategoryService } from "../../category/services/category";
import { ProductService } from "../../product/services/product";
import { CartService } from "../../cart/services/cart";
import { OrderService } from "../../order/services/order";
import { CheckoutService } from "../../checkout/services/checkout";
import { InventoryService } from "../../inventory/services/inventory";

import { Customer } from "../../customer/interfaces/customer";
import { Customer as CustomerModel } from "../../customer/models/customer";

import { Category } from "../../category/interfaces/category";
import { Category as CategoryModel } from "../../category/models/category";

import { Product } from "../../product/interfaces/product";
import { Product as ProductModel } from "../../product/models/product";

import { Inventory } from "../../inventory/interfaces/inventory";
import { Inventory as InventoryModel } from "../../inventory/models/inventory";

import { Cart, CartProduct } from "../../cart/interfaces/index";
import { Cart as CartModel } from "../../cart/models/cart";

import { Checkout } from "../../checkout/interfaces/checkout";
import { Checkout as CheckoutModel } from "../../checkout/models/checkout";

import { OrderCurrency } from "../../order/enums/currency";
import { Address } from "../../order/interfaces/address";


export class OrchestratorService {

	private customerService: CustomerService;
	private categoryService: CategoryService;
	private productService: ProductService;
	private inventoryService: InventoryService;
	private cartService: CartService;
	private orderService: OrderService;
	private checkoutService: CheckoutService;

	constructor () {
		this.customerService = new CustomerService();
		this.categoryService = new CategoryService();
		this.productService = new ProductService();
		this.inventoryService = new InventoryService();
		this.cartService = new CartService();
		this.orderService = new OrderService();
		this.checkoutService = new CheckoutService();
	}

	public orchestrate = (): Observable<any> => {

		const customerAddress: Address = {
			"number": "138",
			"line1": "SAP Labs India",
			"line2": "EPIP Zone, Whitefield",
			"country": "INDIA",
			"state": "KARNATAKA",
			"city": "BANGALORE",
			"postcode": "560066"
		};

		const customer: Customer = {
			firstName: "John",
			lastName: "Doe",
			email: "john@doe.com",
			mobile: "+04123123121"
		};

		const category: Category = {
			name: "Pizza",
			code: "CAT_PIZZ"
		};

		let product: Product = {
			categoryId: "",
			name: "Peppy Paneer",
			sku: "PIZZ_MANIA_PEPPY_PANEER"
		};

		let inventory: Inventory = {
			categoryId: "",
			productId: "",
			price: 638,
			currency: OrderCurrency.INR
		};

		let cart: Cart = {
			customerId: "",
			products: [],
			currency: OrderCurrency.Default,
			total: 0,
			quantity: 0
		};

		let checkout: Checkout = {
			customerId: "",
			cartId: "",
			deliveryAddress: customerAddress
		};


		return Observable.from( [ 1 ] )

			.flatMap( (  ): Observable<CustomerModel> => {
				return this.customerService.create( <CustomerModel>customer );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( customer: CustomerModel ): string => {
				const customerId: string = customer._id;
				cart.customerId = customerId;
				checkout.customerId = customerId;
				return customerId;
			})

			.flatMap( ( ): Observable<CategoryModel> => {
				return this.categoryService.create( <CategoryModel>category );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( category: CategoryModel ): string => {
				const categoryId: string = category._id;
				product.categoryId = categoryId;
				inventory.categoryId = categoryId;
				return categoryId;
			})

			.flatMap( ( ): Observable<ProductModel> => {
				return this.productService.create( <ProductModel>product );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( product: ProductModel ): string => {
				const productId: string = product._id;
				inventory.productId = productId;
				return productId;
			})

			.flatMap( ( ): Observable<InventoryModel> => {
				return this.inventoryService.create( <InventoryModel>inventory );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( inventory: InventoryModel ): InventoryModel => {
				return inventory;
			})

			.flatMap( ( ): Observable<CartModel> => {
				const product: CartProduct = {
					productId: inventory.productId,
					quantity: 2,
					price: inventory.price,
					currency: inventory.currency
				};
				cart.products.push( product );
				return this.cartService.create( <CartModel>cart );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( cart: CartModel ): string => {
				const cartId: string = cart._id;
				checkout.cartId = cartId;
				return cartId;
			})


			.flatMap( ( ): Observable<CheckoutModel> => {
				return this.checkoutService.create( <CheckoutModel>checkout );
			})
			.catch( ( error: any ) => {
				return Observable.throw( error );
			})
			.map( ( checkout: CheckoutModel ): CheckoutModel => {
				return checkout;
			})

		;
	};
}