//------------------------------Importing Module-------------------------------------------------//

import { Component, OnInit,ViewChild,Input,OnChanges  } from '@angular/core';
import {ActivatedRoute,Router} from'@angular/router';

//-----------------------------------------------------------------------------------------------//
@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.css']
})
//-------------------------Exporting VideoCallComponent class-------------------------------------//
export class VideoCallComponent implements OnInit,OnChanges {

@Input('videoFlag') videoFlag:any;
    @ViewChild('myvideo') myVideo: any;
    peer;
    anotherid;
    mypeerid;
    callStream:any;
    callStreamRef:any;
    mediaNavigator = <any>navigator;
//---------------------------Injecting the dependency---------------------------------------------//
    constructor(private router:Router,private route:ActivatedRoute) {

    }
    userId:any;
   //On Initialization
    ngOnInit() {
        console.log("oninit of video call");
      this.userId=localStorage.getItem('id');
      //this.anotherid=localStorage.getItem('sid');
        let video = this.myVideo.nativeElement;
        this.peer = new Peer(this.userId,{host:'192.168.252.186',
            port:4000,
            path:'/peerjs'
        });

        this.mediaNavigator = <any>navigator;
        this.mediaNavigator.getUserMedia =  ( this.mediaNavigator.getUserMedia || this.mediaNavigator.webkitGetUserMedia || this.mediaNavigator.mozGetUserMedia || this.mediaNavigator.msGetUserMedia );
        this.peer.on('call', function(call) {
            var that = this;
            this.callStream = call;
            this.mediaNavigator.getUserMedia({video: true, audio: true}, function(stream) {
                this.callStreamRef = stream;
                call.answer(stream);
                call.on('stream', function(remotestream){
                    video.src = URL.createObjectURL(remotestream);
                    video.play();
                })
                call.on('close', function(remotestream){
                    console.log("Closed is called");
                    that.stopStream(stream);
                })
            }.bind(this), function(err) {
                console.log('Failed to get stream', err);
            })
        }.bind(this));
        
    }
    ngOnChanges(){
        this.anotherid=localStorage.getItem('sid');
        console.log("another peerid in on changes",this.anotherid);
        console.log("peerid in ng on chnaqges ",this.peer);
        if(this.videoFlag===true)
        {
         this.videoconnect();
         }

    }

   /*videconnect method*/
    videoconnect(){
        console.log("inside video connect method");

        let video = this.myVideo.nativeElement;
        var localvar = this.peer;
        var fname = this.anotherid;
        var call =  this.callStream;

        this.mediaNavigator.getUserMedia = ( this.mediaNavigator.getUserMedia || this.mediaNavigator.webkitGetUserMedia || this.mediaNavigator.mozGetUserMedia  || this.mediaNavigator.msGetUserMedia );
        console.log("after media navigator");
        this.mediaNavigator.getUserMedia({video: {frameRate:{ideal:10,max:15}}, audio: true}, function(stream) {
            this.callStreamRef = stream;
            console.log("peer object",localvar);
            console.log("another peer id",fname);
            call = localvar.call(fname, stream);
            this.callStream  = call;
            call.on('stream', function(remotestream) {
                video.src = URL.createObjectURL(remotestream);
                video.play();
            })
        }.bind(this), function(err){
            console.log('Failed to get stream', err);
        })
    }

    /*videodisconnect method*/
    videoDisconnect()
    {
        var call =  this.callStream;
        this.stopStream(this.callStreamRef);
        call.close();
    }

    stopStream(stream)
    {
        stream.getAudioTracks().forEach(function(track) {
            track.stop();
        });
        stream.getVideoTracks().forEach(function(track) {
            track.stop();
        })
    }
}
