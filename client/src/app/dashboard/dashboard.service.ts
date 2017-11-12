import { Injectable,Output,EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DashboardService{

constructor(private http:Http){}

	@Output() photoEmitter = new EventEmitter<any>();

	updateProfile(data){}

	getRegisteredUsers(userId:any): Observable<any>{

const url="http://localhost:4000/privateChannel/getregisteredusers";

 return this.http
    .get(url) //caprivate http:Httplling the http function
    .map((res)=>res.json());
	}

getChannelsData(id:any){

const url="http://localhost:4000/users/getchanneldata";

return this.http
   .post(url,{id})           //caprivate http:Httplling the http function
   .map((res)=>res.json());

}

getChannels(id:any){

const url="http://localhost:4000/users/getuserdata";


return this.http
    .post(url,{id}) //caprivate http:Httplling the http function
    .map((res)=>res.json());

}


addChannel(channelData:any,Users:any=[]){
    
    const url="http://localhost:4000/privateChannel/addchannel";
    
    let data={
channelName:channelData.name,
channelPurpose:channelData.purpose,
channelMembers:Users
    }


   return this.http
   .post(url,data) //calling the http function
   .map((res)=>{
     return res});


}

}
