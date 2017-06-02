import * as HTTPClient from "request";
import { Observable, Subscriber } from "@reactivex/rxjs";

import { Request, Response } from "../index";


export class HTTP {

    private delegate: any;

    public constructor () {
        this.delegate = HTTPClient;
    }


	private static requestCallback ( observer: Subscriber<any>, request: Request, error: any, response: HTTPClient.RequestResponse, body: any ) {
		const statusCode: number = response.statusCode;
		if ( error || ! ( /^2/.test( statusCode.toString() ) ) ) {
			observer.error({
				details: error,
				body: body,
				statusCode: statusCode,
			});
		} else {
			observer.next(
				new Response()
					.setRequest( request )
					.setStatus( response.statusCode )
					.setHeaders( response.headers )
					.setData( JSON.parse( body ) )
			);
			observer.complete();
		}
	}

    public get ( request: Request ): Observable<Response> {
		return Observable.create( ( observer: Subscriber<any> ) => {
			this.delegate.get( request.getURL(), request.build(), ( error: any, response: HTTPClient.RequestResponse, body: any ) => {
				HTTP.requestCallback( observer, request, error, response, body );
			})
		});
	}

	public post ( request: Request ): Observable<Response> {
		return Observable.create( ( observer: Subscriber<any> ) => {
			this.delegate.post( request.getURL(), request.build(), ( error: any, response: HTTPClient.RequestResponse, body: any ) => {
				HTTP.requestCallback( observer, request, error, response, body );
			})
		});
	}

	public put ( request: Request ): Observable<Response> {
		return Observable.create( ( observer: Subscriber<any> ) => {
			this.delegate.put( request.getURL(), request.build(), ( error: any, response: HTTPClient.RequestResponse, body: any ) => {
				HTTP.requestCallback( observer, request, error, response, body );
			})
		});
	}

	public delete ( request: Request ): Observable<Response> {
		return Observable.create( ( observer: Subscriber<any> ) => {
			this.delegate.delete( request.getURL(), request.build(), ( error: any, response: HTTPClient.RequestResponse, body: any ) => {
				HTTP.requestCallback( observer, request, error, response, body );
			})
		});
	}

}