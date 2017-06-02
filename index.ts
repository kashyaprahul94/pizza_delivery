import { env } from "process";
import { App } from "./src/index";

import { CustomerRoute } from "./src/customer/index";
import { CategoryRoute } from "./src/category/index";
import { ProductRoute } from "./src/product/index";
import { CartRoute } from "./src/cart/index";
import { OrderRoute } from "./src/order/index";
import { InventoryRoute } from "./src/inventory/index";
import { CheckoutRoute } from "./src/checkout/index";

import { OrchestratorRoute } from "./src/orchestrator/index";


const port: number = env.PORT || env.VCAP_APP_PORT || 3010;

const onServerStarted = (): void => {
	console.info( `\nServer is listening\n` );
};
const startApp = (): void => {

	const appInstance = App.Instance;
	const serverInstance = appInstance.getServer();

	serverInstance.addRoute( CustomerRoute );
	serverInstance.addRoute( CategoryRoute );
	serverInstance.addRoute( ProductRoute );
	serverInstance.addRoute( CartRoute );
	serverInstance.addRoute( OrderRoute );
	serverInstance.addRoute( InventoryRoute );
	serverInstance.addRoute( CheckoutRoute );

	serverInstance.addRoute( OrchestratorRoute );

	appInstance.boot( port, null, onServerStarted );
};

startApp();