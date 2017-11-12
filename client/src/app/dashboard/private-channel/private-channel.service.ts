import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrivateChannellService {

  constructor(private http:Http) { }

getChannelInfo(channelId:any):Observable<any>{

const url="http://localhost:4000/privateChannel/getchannelinfo";
console.log("channel id",channelId);

return this.http
    .post(url,channelId) //calling the http function
    .map((res)=>{
		console.log("this is getchannelInfo response",res)
      return res.json()});
}

saveMessage(message:any):Observable<any>{
console.log("this is message ",message);
const url="http://localhost:4000/privateChannel/addchannelmessage";


return this.http
    .post(url,message) //calling the http function
    .map((res)=>{
		console.log("this is save channel message",res)
      return res.json()});
}


getUserInfo(loggedInUserId:any):Observable<any>{


const url="http://localhost:4000/users/getuserdata";


return this.http
    .post(url,{"id":loggedInUserId}) //calling the http function
    .map((res)=>{
		console.log("this is user data",res)
      return res.json()});

}

}
