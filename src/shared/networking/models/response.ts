import { Header, Request, HeaderValueType } from "./index";

export class Response {

    private _request: Request;
    private _status: number;
    private _data: any;
    private _headers: Header;

    constructor ( request: Request = null, status: number = -1, headers: Header = null, data: any = null ) {
		this._request = request;
        this._status = status;
        this._headers = headers;
        this._data = data;
    }


	public request (): Request {
		return this._request;
	}
	public setRequest ( request: Request ): Response {
		this._request = request;
		return this;
	}

    public status (): number {
        return this._status
    }
    public setStatus ( status: number ): Response {
        this._status = status;
        return this;
    }

	public headers ( name?: string ): HeaderValueType | Header {
		if ( name ) {
			return this._headers[ name ];
		}
		return this._headers;
	}
    public setHeaders ( headers: Header ): Response {
        this._headers = headers;
        return this;
    }

    public data (): any {
        return this._data;
    }
    public setData ( data: any ): Response {
        this._data = data;
        return this;
    }
}