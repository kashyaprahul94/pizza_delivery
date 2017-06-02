import { StatusCode } from "../enums/code";

export class Error {

	private statusCode: StatusCode;
	private code: string;
	private name: string;
	private description: string;

	constructor ( _statusCode: StatusCode = StatusCode.Defualt, _code: string = "", _name: string = "", _description: string = "" ) {
		this.statusCode = _statusCode;
		this.code = _code;
		this.name = _name;
		this.description = _description;
	}

	public getStatusCode (): StatusCode {
		return this.statusCode;
	}
	public setStatusCode ( _statusCode: StatusCode ): Error {
		this.statusCode = _statusCode;
		return this;
	}


	public getCode (): string {
		return this.code;
	}
	public setCode ( _code: string ): Error {
		this.code = _code;
		return this;
	}

	public getName (): string {
		return this.name;
	}
	public setName ( _name: string ): Error {
		this.name = _name;
		return this;
	}

	public getDescription (): string {
		return this.description;
	}
	public setDescription ( _description: string ): Error {
		this.description = _description;
		return this;
	}
}