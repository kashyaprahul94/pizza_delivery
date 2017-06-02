export enum StatusCode {
	Okay = 200 as any,
	Created = 201 as any,
	BadRequest = 400 as any,
	Unauthorized = 401 as any,
	Unprivillaged = 403 as any,
	NotFound = 404 as any,
	MethodNotAllowed  = 405 as any,
	Conflict = 409 as any,
	ServerError = 500 as any,
	GatewayError = 502 as any,

	Defualt = StatusCode.ServerError as any
}