export const enum RequestMethod {
    Get = 0,
    Post = 1,
    Put = 2,
    Delete = 3,
    Options = 4,
    Head = 5,
    Patch = 6,

    Default = RequestMethod.Get
}

export const RequestHeaders: any = {
    "Accept": "Accept",
    "Authorization": "Authorization",
    "ContentType": "Content-Type"
};

export const RequestHeadersValues: any = {
    "ContentJSON": "application/json",
    "ContentFormEncoded": "application/x-www-form-urlencoded",
    "AuthorizationBasic": "Basic",
    "AuthorizationBearer": "Bearer"
};
