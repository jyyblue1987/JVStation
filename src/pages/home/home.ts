import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import {LaunchService} from '../../providers/launch-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  queries: {
    content: new ViewChild('content')
  },
  providers:[LaunchService]
})
export class HomePage {
	@ViewChild(Content) content: Content;
	public launches:any = [];
  	private start:number=0;

  	constructor(public navCtrl: NavController, public launchService: LaunchService) {
  		// this.launches = [
				// 		      {
				// 		        "id": 4135,
				// 		        "product": "Affiliate Blogging Ninja",
				// 		        "vendor": "Dale Taylor et al",
				// 		        "launchDate": "2017-03-28T00:00:00.000+0000",
				// 		        "jvPage": "http://affiliatebloggingninja.com/jv/",
				// 		        "frontEndPrice": "10",
				// 		        "commission": "100",
				// 		        "bookmarked": false,
				// 		        "featured": false,
				// 		        "fgColor": null,
				// 		        "bgColor": null
				// 		      },
				// 		      {
				// 		        "id": 3711,
				// 		        "product": "ProfitBuilder 2.0",
				// 		        "vendor": "Sean Donahoe",
				// 		        "launchDate": "2017-03-28T00:00:00.000+0000",
				// 		        "jvPage": "http://wpprofitbuilder.com/jv",
				// 		        "frontEndPrice": "67-197",
				// 		        "commission": "50",
				// 		        "bookmarked": false,
				// 		        "featured": false,
				// 		        "fgColor": null,
				// 		        "bgColor": null
				// 		      },						     
				// 		    ];
  		this.loadLaunch();	
  	}

  	loadLaunch() {
	    return new Promise(resolve => {
		    this.launchService.load(this.start)
		      	.then(data => {	
		      		var list = data['_embedded'].launches;	        
			        for(let item of list) {
			          	this.launches.push(item);
			        }
			        
			        resolve(true);		        
		      	});            
    	});
  	}

  	doInfinite(infiniteScroll:any) {
     	this.start++;

     	console.log('doInfinite, start is currently '+this.start);

 		this.loadLaunch().then(()=>{
	    	console.log('doInfinite, Complete');	    	
	       	infiniteScroll.complete();
	       	// this.content.scrollToBottom(500);
	    });     
  	}

}
