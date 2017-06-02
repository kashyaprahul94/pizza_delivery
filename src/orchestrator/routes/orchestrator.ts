import { Router, Request, Response } from "express";

import { OrchestratorService } from "../services/orchestrator";

export class OrchestratorRoute {

	public static BasePath: string = "/orchestrate";

	private router: Router;
	private delegate: OrchestratorService;

	private constructor () {
		this.router = Router();
		this.delegate = new OrchestratorService();
	}

	public static create (): Router {
		const instance = new OrchestratorRoute();

		instance.router.get( "/", instance.orchestrate );

		return instance.router;
	}


	public orchestrate = ( req: Request, res: Response ): void => {
		this.delegate.orchestrate()
			.subscribe( ( result: any ) => {
				res.json( result );
			}, ( error: any ) => {
				res.status( 500 ).send( error );
			})
		;
	};
}