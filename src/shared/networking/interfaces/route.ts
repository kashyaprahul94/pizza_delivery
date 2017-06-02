import * as Express from "express";

export interface Route {

	BasePath: string;
	create (): Express.Router;
}