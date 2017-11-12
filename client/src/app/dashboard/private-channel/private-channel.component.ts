import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {PrivateChannellService} from './private-channel.service';
import {PrivateChannelService} from '../../shared/private-channel.service';
@Component({
  selector: 'app-private-channel',
  templateUrl: './private-channel.component.html',
  styleUrls: ['./private-channel.component.css']
})
export class PrivateChannelComponent implements OnInit {


public currentChannelId:any;
public previousChannelId:any;
public message:any;
public loggedInUserId:any;
public dbLoadedMessages:any;
public currentUserData:any;
public currentUserName:any;

  constructor(private privatechannelsocket:PrivateChannelService,private router:Router,private route:ActivatedRoute,private privatechannelservice:PrivateChannellService) {

this.privatechannelsocket.privateChannelMessageObservable.subscribe((message)=>{
console.log("this is socket returned messages",message);
this.dbLoadedMessages.push(message);
});
   }

  ngOnInit() {
this.dbLoadedMessages=[];
this.loggedInUserId=localStorage.getItem("id");

if(this.loggedInUserId){

this.privatechannelservice.getUserInfo(this.loggedInUserId).subscribe((userdata)=>{
console.log("this is user data",userdata);
this.currentUserName=userdata.username;
});

}

this.route.params.subscribe((params)=>{
	console.log("params",params);
	console.log("previous",this.previousChannelId);

	this.currentChannelId=params;
	// this.previousChannelId=this.currentChannelId;
	// console.log("previous channel id",this.previousChannelId);
	// console.log("curreny channel id",this.currentChannelId);
	if(this.previousChannelId!=undefined){
			this.leaveChannel();
	}
		if(this.currentChannelId){
			console.log("current",this.currentChannelId);
			this.joinChannel();
			this.previousChannelId=this.currentChannelId;
		}

if(params){
	this.getChannelData();
	console.log("paramsssssssssssssss");
}



})

  }


joinChannel(){
this.privatechannelsocket.joinChannel(this.currentChannelId);
}

leaveChannel(){
this.privatechannelsocket.leaveChannel(this.previousChannelId);
}

getChannelData(){
	console.log("skjafhf");
this.privatechannelservice.getChannelInfo(this.currentChannelId).subscribe((result)=>{
console.log("this is channel data",result);
if(result){
	this.dbLoadedMessages=result.messages;
	console.log("these are messages",this.dbLoadedMessages);
}

});
}

sendMessage(){
let data={

	channelId:this.currentChannelId,
	channelMessage:this.message,
	messageSender:this.loggedInUserId,
	messageSenderName:this.currentUserName
}
this.privatechannelservice.saveMessage(data).subscribe((message)=>{

console.log("this is message",message);
this.dbLoadedMessages.push(message);

if(message){

let socketdata={
	channelId:this.currentChannelId.channelId,
	channelMessage: this.message, 
	messageSender: this.loggedInUserId,
	messageSenderName:this.currentUserName

}

 this.privatechannelsocket.sendMessage(socketdata);

}

});

}


}
