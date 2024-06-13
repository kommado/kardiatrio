export namespace main {
	
	export class Profile {
	    first_name: string;
	    last_name: string;
	    email: string;
	    password: string;
	
	    static createFrom(source: any = {}) {
	        return new Profile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.first_name = source["first_name"];
	        this.last_name = source["last_name"];
	        this.email = source["email"];
	        this.password = source["password"];
	    }
	}

}

export namespace service {
	
	export class ApiResponse {
	    data: any[];
	    total: number;
	
	    static createFrom(source: any = {}) {
	        return new ApiResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.data = source["data"];
	        this.total = source["total"];
	    }
	}
	export class ApiResponseSingle {
	    data: any;
	
	    static createFrom(source: any = {}) {
	        return new ApiResponseSingle(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.data = source["data"];
	    }
	}
	export class Query {
	    sort: string[];
	    range: number[];
	    filter: {[key: string]: any};
	
	    static createFrom(source: any = {}) {
	        return new Query(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.sort = source["sort"];
	        this.range = source["range"];
	        this.filter = source["filter"];
	    }
	}
	export class GetListRequestParams {
	    query: Query;
	
	    static createFrom(source: any = {}) {
	        return new GetListRequestParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.query = this.convertValues(source["query"], Query);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class GetManyRequestParams {
	    ids: number[];
	
	    static createFrom(source: any = {}) {
	        return new GetManyRequestParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ids = source["ids"];
	    }
	}
	export class GetOneRequestParams {
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new GetOneRequestParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}
	export class PostRequestOnlyData {
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new PostRequestOnlyData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.body = source["body"];
	    }
	}
	export class PostRequestParamsMulti {
	    ids: number[];
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new PostRequestParamsMulti(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ids = source["ids"];
	        this.body = source["body"];
	    }
	}
	export class PostRequestParamsSingle {
	    id: string;
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new PostRequestParamsSingle(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.body = source["body"];
	    }
	}

}

