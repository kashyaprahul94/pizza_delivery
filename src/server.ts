import { env } from "process";

import * as Express from "express";
import * as BodyParser from "body-parser";
import * as Logger from "morgan";
import * as ErrorHandler from "errorhandler";
import * as CORS from "cors";
import * as _ from "lodash";

import { Route } from "./shared/networking/interfaces/route";

export class Server {

	private static DefaultPort: number = env.PORT || env.VCAP_APP_PORT || 3099;
	private static DefaultHost: string = env.HOST || env.VCAP_APP_HOST || "localhost";

    private instance: Express.Application;
    private port: number;
    private hostname: string;

    private router: Express.Router;
    private routes: Route[];

    constructor ( port?: number, hostname?: string ) {

        this.instance = Express();
        this.port = port || Server.DefaultPort;
        this.hostname = hostname || Server.DefaultHost;

        this.router = Express.Router();
        this.routes = [];

        this.config();
    }

    public withPort ( port: number ): Server {
        this.port = port;
        return this;
    }

    public asHostname ( hostname: string ): Server {
        this.hostname = hostname;
        return this;
    }



	private config (): void {

		this.instance.use( Logger( "combined" ) );

		this.instance.use( BodyParser.json() );

		this.instance.use( BodyParser.urlencoded({
			extended: true
		}));

		this.instance.use( ErrorHandler() );

		this.instance.use( CORS() );
	}




	public addRoute ( route: Route ): Server {
		this.routes.push( route );
		return this;
	}

	private initRoutes (): void {
		_.forEach( this.routes, ( route: Route ) => {
			this.instance.use( route.BasePath, route.create() );
		});
	}





    public boot ( callback: Function ): void {
        this.initRoutes();
        this.instance.listen( this.port, this.hostname, callback );
    }
}