import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as config from './config/multi_en_config.json';
import expressUrls from '../config/url';

/*=========================== Importing services==============================*/

import { SocketService } from './../socket.service';
import { HttpService } from './../http.service';
import { ChatService } from './../chat.service';
import {GetInfoService} from './../shared/get-info.service';
import {DashboardService} from './dashboard.service';
import {PrivateChannelService} from './../shared/private-channel.service'
import swal from 'sweetalert2';

/* Importing services ends*/
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers:[DashboardService]
})
export class DashboardComponent implements OnInit {

/*
* UI related variables starts
*/

//-----------private channel---------------//
public selectedUsers:any=[];
public dropdownList = []; 		// for storing the registered users
public selectedItems = [];		// for storing only the selected users at the time of channel creation
public dropdownSettings = {};	// internally used by angular-2-multiselect
private channelData:any={};		// for storing the data at the time of new channel creation binded through html
private allUsers:any=[];        // for storing the full data of the registered users fetched from database 
private registeredUsers:any=[];  // for storing only the filtered data of the registered users containing name and user id only
//-----------private channel---------------//

public word= (<any>config).dashboard;

/*==========================UI related variables starts=====================*/

private editflag=false;
private overlayDisplay = false;
private selectedUserId = null;
private selectedSocketId = null;
private selectedUserName = null;
private offlineUsers:any=[];	
flagResponse:any=[];
videoUser:any;

/*==============Chat and message related variables starts===================*/


private username = null;
private userId = null;
private socketId = null;
private currentRoute=null;
private chatListUsers = [];
private profilePhoto:any;
public channelIds=[];
public subscribedChannelsData=[];

userInfo:any;
flagArray:any=[];
reciever:any=[];
isSocketConnected:boolean = false;
userData:any;
flag:any;

profilePhotoURL:any;

constructor(private chatService : ChatService,
	private socketService : SocketService,
	private route :ActivatedRoute,
	private privatechannelservice:PrivateChannelService,
	private router :Router,
	private httpService:HttpService,
	private genService:GetInfoService,
	private dashboardService : DashboardService) {
	this.privatechannelservice.privateChannelNameObservable.subscribe((channelname)=>{
		let id=localStorage.getItem("id");
		console.log("#######",id);
		if(channelname){
			this.dashboardService.getChannels(id).subscribe((userdata)=>{
				// console.log("this is user data",userdata.channels);
				this.channelIds=userdata.channels;
				if(userdata){
					this.subscribedChannelsData=[];
					this.channelIds.map((i)=>{
						console.log("hey",i.channelId);
						this.dashboardService.getChannelsData(i.channelId).subscribe((channeldata)=>{
							console.log("this is all channels data",channeldata);
							this.subscribedChannelsData.push(channeldata);
						});
					})
					console.log("this is final subscribed channels data",this.subscribedChannelsData);
				}
			});
		}

	})

}

//--------------- private channel ------------------------//

// internal functions used by angular-2-multiselect

onItemSelect(item:any){
	
}
OnItemDeSelect(item:any){
	
}
onSelectAll(items: any){
	
}
onDeSelectAll(items: any){
	
}
//--------------- private channel ------------------------//

ngOnInit() {

	//--------------- private channel ------------------------//
	this.retreivechannnels();
	this.selectedItems = [];
	this.dropdownSettings = {
		singleSelection: false,
		text:"Select by Name",
		selectAllText:'Select All',
		unSelectAllText:'UnSelect All',
		enableSearchFilter: true,
		classes:"myclass custom-class"
	};



	//--------------- private channel ------------------------//


	this.userId=localStorage.getItem('id');
	if(this.userId === '' || typeof this.userId == 'undefined') {
		this.router.navigate(['/']);
	}else{

/*
* function to check if user is logged in or not starts
*/	

this.chatService.userSessionCheck(this.userId,( error, response )=>{
	//console.log("this is user data",response.profilePhoto);
	if(error) {
		this.router.navigate(['/']); /* Home page redirection */
	}else{
		if(response.reciever){
			this.reciever=response.reciever.map(i=>i.fromId);
			this.flagArray=response.reciever.map(i=>i.flag);
		}
		console.log("User session check -----------------",response);

		if(response.profilePhoto){this.profilePhoto= response.profilePhoto;
			this.profilePhotoURL=expressUrls.profilePhotoAccess+response.profilePhoto}

			this.username = response.username;
			this.overlayDisplay = true;

/*
* making socket connection by passing UserId.
*/	
this.isSocketConnected = this.socketService.connectSocket(this.userId);


/*
* calling method of service to get the chat list.
*/	
this.socketService.getChatList(this.userId).subscribe(response => {
	console.log("online users list",response);

	if(!response.error) {

		if(response.singleUser) 
		{

			if(this.router.url.includes('?'))
			{

				this.route.queryParams.subscribe(params => {
					let selectedUserId = params["selectedUserId"];
					let selectedUserName = params["selectedUserName"];
					if(selectedUserId === response.chatList._id)
					{
						this.userData = {
							_id: selectedUserId,
							socketId: response.chatList.socketId,
							username: selectedUserName
						}
						this.selectedUser(this.userData);
					}

				})
				
				
			}

/* 
* Removing duplicate user from chat list array.
*/
if(this.chatListUsers.length > 0) {
	this.chatListUsers = this.chatListUsers.filter(function( obj ) {
		return obj._id !== response.chatList._id;
	});
}

/* 
* Adding new online user into chat list array
*/


this.chatListUsers.push(response.chatList);


}else if(response.userDisconnected){
	this.chatListUsers = this.chatListUsers.filter(function( obj ) {
		return obj.socketId !== response.socketId;
	});
}else{
/* 
* Updating entire chatlist if user logs in.
*/
this.chatListUsers = response.chatList;
}
}else{
	alert(`Chat list failure.`);
}
this.getAllUsers();

});

}
this.socketService.getFlagToDashBoard().subscribe(resp=>{

	this.flagResponse=resp;
	

	this.reciever=this.flagResponse.reciever.map((i)=>i.fromId);
	this.flagArray=this.flagResponse.reciever.map(i=>i.flag);

});

this.socketService.getVideoResponse().subscribe((response)=>{
	console.log("############################################",response);
	this.videoUser=response;
	swal({
		title:'Incoming Call ',

		text:this.videoUser.username+' is calling...',

		type:'info',
		showCancelButton:true,
		confirmButtonColor:'#283e4a',
		cancelButtonColor:'#f16363',
		padding:10,
		confirmButtonClass:null,
		width:'390px',
		confirmButtonText:'Accept'
	}).then(()=>{
		console.log("inside swal");
		let userData={
			userId: this.videoUser.toId,
			selectedUserId :this.videoUser.userId,
			selectedSocketId :this.videoUser.mySocketId,
			selectedUserName :this.videoUser.username,
			type:"v"
		}
		localStorage.setItem('sid',userData.selectedUserId);

		
		this.router.navigate(['chats'],{relativeTo: this.route, queryParams: userData});
		
	});
})

});
}


this.dashboardService.photoEmitter.subscribe((data)=>{
	console.log("photo data $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",data);
	this.profilePhoto=data.result.profilePhoto;
})


} // end of onInit()


// --------------------------- private channel ------------------------------------------------//

transferChannelId(channelId:any){
	//console.log("this is transferchannelId",channelId);
	this.router.navigate(['/dashboard/privatechannel/'+channelId]);

}



// for fetching all the registered users 

retreivechannnels(){
	this.dashboardService.getChannels(localStorage.getItem("id")).subscribe((userdata)=>{
		// console.log("this is user data",userdata.channels);
		this.channelIds=userdata.channels;
		if(userdata){
			this.channelIds.map((i)=>{
				this.dashboardService.getChannelsData(i.channelId).subscribe((channeldata)=>{
					this.subscribedChannelsData.push(channeldata);
				});
			})
		}
	});
}



fetchRegisteredUsers(){


	this.dashboardService.getRegisteredUsers(this.userId).subscribe((result)=>{

		this.allUsers=result.result;

		this.registeredUsers=this.allUsers.map(i=>{
			var data={id:i._id,itemName:i.username}
			return data;
		});

		this.dropdownList=this.registeredUsers;

	})

}


// for creating the channel to the private channel collection and also populate the id of that channel object
// to the selected users user object

createChannel(){


	this.dashboardService.addChannel(this.channelData,this.selectedItems).subscribe((response)=>{
		if(response){


			this.privatechannelservice.broadcastChannelName(this.channelData.name);


			swal({
				title:'Congratulations !! ',
				text:this.channelData.name +' Channel created succesfully',
				type:'info',
				showCancelButton:true,
				confirmButtonColor:'#283e4a',
				cancelButtonColor:'#f16363',
				padding:10,
				confirmButtonClass:null,
				width:'390px',
				confirmButtonText:'Accept'
			}).then(()=>{
				




			});

		}
	});
}
// --------------------------- private channel ------------------------------------------------//

isUserSelected(userId:string):boolean{
	if(!this.selectedUserId) {
		return false;
	}
	return this.selectedUserId ===  userId ? true : false;
}
selectedUser(user):void{

	this.userData={
		userId: this.userId,
		selectedUserId :user._id,
		selectedSocketId :user.socketId,
		selectedUserName :user.username,
		username:this.username
	};

	this.httpService.resetFlag({"toId":this.userData.userId,"fromId":this.userData.selectedUserId}).subscribe((response)=>{

		this.flagArray[this.reciever.indexOf(user._id)]=0;

		this.router.navigate(['chats'],{relativeTo: this.route, queryParams: this.userData});

	})

}
getAllUsers(){
	console.log("inside getallusers");
	this.socketService.getUserList(this.userId).subscribe((result)=>{
		console.log("all users",result);
		let temp=result.filter(function(user){
			if(user._id==localStorage.getItem('id'))
			{
				return user.socketId;
			}
		});
		console.log("socketId$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",temp);
		localStorage.setItem('socketId',temp[0].socketId);
		this.offlineUsers = result.filter(function(user){
			return user.online=='N';
		});
		console.log("Offline users are",this.offlineUsers);

	});
}

logout(){
	console.log("logout method");
	this.socketService.logout({userId : this.userId}).subscribe(response => {
		this.router.navigate(['/login']); /* Home page redirection */
	});
}
selectOfflineUsers(user):void{
	console.log("$$$$$$$$$$$$$",user);
	this.userData={
		userId: this.userId,
		selectedUserId :user._id,
		selectedSocketId :user.socketId,
		selectedUserName :user.username,
		username:this.username,
		status:'offline'
	};
	this.httpService.resetFlag({"toId":this.userData.userId,"fromId":this.userData.selectedUserId}).subscribe((response)=>{
		console.log("resetFlag!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",response);
		//this.flagArray[this.reciever.indexOf(this.userData.userId)]=0;
		this.flagArray[this.reciever.indexOf(user._id)]=0;
		console.log("66666666666666666666666666666666666666",this.flagArray);
		this.router.navigate(['chats'],{relativeTo: this.route, queryParams: this.userData});

	})

}



}