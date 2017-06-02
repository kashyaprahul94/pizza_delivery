import { Options as RequestOptions } from "request";
import * as _ from "lodash";
import { Headers, Header, Form, FormData, Params,Param, RequestMethod, HeaderValueType } from "../index";

type dataValue = any | any[] | null;

export class Request {

    private method: RequestMethod;
    private url: string;
    private params?: Params[];
	private formData?: FormData[];
    private headers?: Headers[];
    private headersMap: Header;
    private data?: dataValue;

    constructor (
        method: RequestMethod = RequestMethod.Default,
        url: string = "",
        params: Params[] = [],
		formData: FormData[] = [],
        headers: Headers[] = [],
        data: dataValue = null
    ) {
        this.method = method;
        this.url = url;
        this.params = params;
        this.formData = formData;
        this.headers = headers;
        this.headersMap = {};
        this.data = data;
    }

    public getMethod (): RequestMethod {
        return this.method
    }
    public setMethod ( method: RequestMethod ): Request {
        this.method = method;
        return this;
    }

    public getURL (): string {
        return this.url
    }
    public setURL ( url: string ): Request {
        this.url = url;
        return this;
    }

    public getParams (): Params[] {
        return this.params
    }
    public setParams ( params: Params[] ): Request {
        this.params = params;
        return this;
    }

	public getFormData (): FormData[] {
		return this.formData
	}
	public setFormData ( formData: FormData[] ): Request {
		this.formData = formData;
		return this;
	}

    public getHeaders (): Headers[] {
        return this.headers
    }
    public setHeaders ( headers: Headers[] ): Request {
        this.headers = headers;
        this.setHeadersMap();
        return this;
    }
	private setHeadersMap (): Request {
		_.each( this.headers, ( item ) => {
			this.headersMap[ item.getName() ] = item.getValue();
		});
		return this;
	}
	public header ( name: string ): HeaderValueType {
		return this.headersMap[ name ] || "";
	}

    public getData (): dataValue {
        return this.data
    }
    public setData ( data: dataValue ): Request {
        this.data = data;
        return this;
    }



    public addParam ( param: Params ): Request {
        this.params.push( new Params( param.getKey(), param.getValue() ) );
        return this;
    }
	private buildParams (): Param {
		let result: Param = {};
		_.each( this.params, ( item ) => {
			result[ item.getKey() ] = item.getValue();
		});
		return result;
	}

	public addFormData ( form: FormData ): Request {
		this.formData.push( new FormData( form.getName(), form.getValue() ) );
		return this;
	}
	private buildFormData (): Form {
    	let result: Form = {};
		_.each( this.formData, ( item ) => {
			result[ item.getName() ] = item.getValue();
		});
		return result;
	}

    public addHeader ( header: Headers ): Request {
        this.headers.push( new Headers( header.getName(), header.getValue() ) );
        this.headersMap[ header.getName() ] = header.getValue();
        return this;
    }
	private buildHeaders (): Header {
		//let result: Header = {};
		//_.each( this.headers, ( item ) => {
		//	result[ item.getName() ] = item.getValue();
		//});
		//return result;
		return this.headersMap;
	}

    public build (): RequestOptions {
        return {
        	url: this.getURL(),
			qs: this.buildParams(),
        	form: this.buildFormData(),
			headers: this.buildHeaders(),
			body: this.getData()
        }
    }
}