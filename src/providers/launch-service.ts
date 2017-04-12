import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LaunchService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LaunchService {

  	constructor(public http: Http) {
    	console.log('Hello LaunchService Provider');
  	}

  	load(page:number=0) {
	    return new Promise(resolve => {
    	 	let opt: RequestOptions
		   	let myHeaders: Headers = new Headers
		   	myHeaders.set('Authorization-Token', 'DEVTOKEN1');
		   	// myHeaders.append('app-key', 'a2d31ce2ecb3c46739b7b0ebb1b45a8b');
		   	// myHeaders.append('Content-type', 'application/json')
		   
		   	opt = new RequestOptions({
		     	headers: myHeaders
		    });   

		    console.log('Rest Api Start');

		    this.http.get('http://ilt.onlinebusinessfactory.net/launches/search/getPastLaunches?page='+ page +'&projection=withBookmarks', opt)
		        .map(res => res.json())
		        .subscribe(data => {
		        	console.log('Rest Api End');
		          	resolve(data);
		        });
	    });
  	}
}
