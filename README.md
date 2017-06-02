Pizza Order System written in pure TypeScript
=========================================

----------


Installation
-------------

```bash
$ mongod --dbpath ./data/db
```

```bash
$ npm start
```

```
Navigate to => http://localhost:3010/orchestrate
```


#
API Usage
-------------

### Customer =>

http://localhost:3010/customers
```json
{
	"firstName": "John",
	"lastName": "Doe",
	"email": "john@doe.com",
	"mobile": "+04123123121"
}
```


### Category =>

http://localhost:3010/categories
```json
{
	"name": "Pizza",
	"code": "PIZZA"
}
```



### Products =>

http://localhost:3010/products
```json
{
	"name": "Pizza Mania",
	"sku": "PIZ_12378N",
	"categoryId": "592d99e6665badcc446b4939"
}
```



### Carts =>

http://localhost:3010/carts
```json
{
	"customerId": "592daf05e4166bcf363a11cc",
	"quantity": 2,
	"total": 1500,
	"currency": "INR",
	"products": [{
		"productId": "592d9aed3eab75cc58c2376d",
		"quantity": 1,
		"price": 1000,
		"currency": "INR"
	}, {
		"productId": "592d9aed3eab75cc58c2376d",
		"quantity": 1,
		"price": 500,
		"currency": "INR"
	}]
}
```

add product item to cart

http://localhost:3010/carts/592ef159e3cb65f130563dd7/add-product
```json
{
	"productId": "592d9aed3eab75cc58c2376d",
	"quantity": 3,
	"price": 1400,
	"currency": "INR"
}
```




### Orders =>

http://localhost:3010/orders
```json
{
	"customerId": "592daf05e4166bcf363a11cc",
	"cartId": "592e68548661c0d87b874ce7",
	"quantity": 2,
	"total": 1500,
	"currency": "INR",
	"paymentType": "DEBIT_CARD",
	"deliveryAddress": {
		"number": "138",
		"line1": "SAP Labs India",
		"line2": "EPIP Zone, Whitefield",
		"country": "INDIA",
		"state": "KARNATAKA",
		"city": "BANGALORE",
		"postcode": "560066"

	}
}
```

### Checkout =>

http://localhost:3010/checkout
```json
{
	"customerId": "592edfc13ca398f00d91b1cb",
	"cartId": "592ef159e3cb65f130563dd7",
	"deliveryAddress": {
		"number": "138",
		"line1": "SAP Labs India",
		"line2": "EPIP Zone, Whitefield",
		"country": "INDIA",
		"state": "KARNATAKA",
		"city": "BANGALORE",
		"postcode": "560066"

	}
}
```


Algo =>

Client:

### Do_Login
### if Login_status = Success, proceed to step 3.
### call network for get_inventory.
### browse through inventory.
### call network for add_product_to_cart.
### finalize cart by updating it
### if coupon -> call network apply
### do_checkout => call network


```c
create_order( customer_id, cart_id ) {

	create order object for customer;
	products = get_products_from_cart( cart_id );
	for each product quantity = get_associative_lock();

	calculate_order_amount( products );
	set_order_status( "placed" );

}
```

```c
process_payment( cart_id, payment_details ) {

}
```