export type HeaderValueType = number | string | boolean;

export interface Header {
    [ key: string ]: HeaderValueType
}

export class Headers {

    private name: string;
    private value: HeaderValueType;

    constructor ( name: string = "", value: HeaderValueType = "" ) {
        this.name = name;
        this.value = value;
    }

    public getName (): string {
        return this.name;
    }
    public setName ( name: string ): Headers {
        this.name = name;
        return this;
    }

    public getValue (): HeaderValueType {
        return this.value;
    }
    public setValue ( value: HeaderValueType ): Headers {
        this.value = value;
        return this;
    }

    public build (): Header {
        let headers: Header;
		headers[ this.getName() ] = this.getValue();
        return headers;
    }
}