import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';




export class PrivateChannelService {

   private url = 'http://localhost:4000';
   private socket;
   privateChannelNameObservable:any;
   privateChannelMessageObservable:any;

       constructor() {
this.socket = io(this.url);


this.privateChannelNameObservable=Observable.create((observer)=>{
  this.socket.on('broadcastChannelName',(channelname)=>{
observer.next(channelname);
  })
})

this.privateChannelMessageObservable=Observable.create((observer)=>{
	console.log("hey you private-channelservice");
	this.socket.on('channel-message',(channelmessage)=>{
		console.log("hey channel-message");
		observer.next(channelmessage);
	});
})

    }

 broadcastChannelName(channelname:any){
	this.socket.emit('broadcastChannelName',channelname);
 }

 leaveChannel(ChannelId:any){
 	this.socket.emit('chat-room-leave',ChannelId);
 }

 joinChannel(ChannelId:any){
	this.socket.emit('chat-rooms-join',ChannelId);
 }
 sendMessage(channelMessage:any){
 	console.log("inside socket servive send message");
 	this.socket.emit('private-channel-message',channelMessage);
 }



}









// privateChannelObservable: any;
// privateChannelNameObservable: any;
//    constructor() {

//      this.socket = io(this.url);
 
//      this.privateChannelObservable = Observable.create((observer) => {
           
//            this.socket.on('some-event',(chatRoom)=>{
//                    console.log("getChatRoom",chatRoom);
//                     observer.next(chatRoom);
//                });
//            });

//         this.privateChannelNameObservable = Observable.create((observer) => {
           
//            this.socket.on('broadcast-name',(channel)=>{
//                    console.log("this is broadcasted name",channel);
//                     observer.next(channel);
//                });
//            });
//    }


//     public disconnectUsers(){
//        this.socket.emit('disconnect');
//    }


// public sendMessage(channelmesssage:any){
// this.socket.emit('chat-rooms-message',channelmesssage);

// }




//    public chatRoom(privateChannelData:any){
// console.log("inside service chat room",privateChannelData);
// this.socket.emit('chat-rooms',privateChannelData);
//    }

//    public leaveRoom(previousChannelName:any){
// console.log("inside service chat room to leave room");
// this.socket.emit('chat-rooms-leave',previousChannelName);
//    }
