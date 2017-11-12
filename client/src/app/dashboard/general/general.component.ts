/*=================importing modules====================*/

import * as config from './config/multi_en_config.json';
import { Component, OnInit,ElementRef } from '@angular/core';
import { GeneralChatService } from '../../shared/general-chat.service';
import { ChatService } from './../../chat.service';
import { HttpService } from './../../http.service';
import {GeneralService}from './general.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import expressUrls from '../../config/url';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers:[GeneralChatService,ChatService,HttpService,GeneralService]

})

export class GeneralComponent implements OnInit {
  public word= (<any>config).general;

  allGeneralMessages:any=[];
  private username = null;
  private userId = null; 
  socketmessage:any;
  socketcode: any;
  message: string;
  messages: string[] = [];
  user:any;
  userfinal:any;
  serveruser:any;
  chatroom:string;
  currentUser:string;
  java:any="java";
  c:any="c";
  py:any="py";
  js:any="js";
  json:any="json"
  php:any="php"
  txt:any='txt'
  sql:any='sql'
  html:any='html'
  language:string;
  data:any={};
  dbmessage:any={};
  url:any;
  scrapingData:any={};
  sendData:any={};
  codeId:any;
  fileData:any;
  socketfile:any;
  downloadCodeTesting:any;
  saveMessageTesting:any;
  retreiveMsgDataComponent:any=[];
  sendCodeDataComponent:any;

  constructor(private generalChatService: GeneralChatService,private generalService:GeneralService,
    private chatService : ChatService,
    private route :ActivatedRoute,
    private router :Router,
    private el: ElementRef,
    public sanitizer: DomSanitizer)   
  {


    this.generalChatService.getMessageObservable.subscribe((message)=>{
      
      this.socketmessage=message; 
      this.allGeneralMessages.push(this.socketmessage);
      setTimeout( () =>{
        document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
      },100);    
      
    })

    this.generalChatService.getCodeObservable.subscribe((code)=>{
      //console.log("code is here", code);
      var codemodified={
        "username":code.username,
        "code":{
          "codeId":code.codeId, 
          "code":code.code,
          "language":code.language,
          "title":code.title
        }

      }
      this.socketcode=codemodified; 

      this.allGeneralMessages.push(this.socketcode);
      setTimeout( () =>{
        document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
      },100);   

    })

    this.generalChatService.getFileObservable.subscribe((file)=>{
      var fileModified=file
    
      this.socketfile=fileModified; 
      this.allGeneralMessages.push(this.socketfile);
      setTimeout( () =>{
        document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
      },100);  
    })
    
  }

  messageFileUrl:string;
  newWindowFile(message){window.open(message.fileUrl)}

  //Call back sequence for upload file

  sendFileData(callbackfile=()=>{


    //============================== saving the file to db start====================================//

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    let fileCount: number = inputEl.files.length;
    let fileType = inputEl.files[0].type
    let formData = new FormData();
    if(fileCount > 0)
    {
      formData.append('file', inputEl.files.item(0));
      this.generalService.uploadFile(formData, this.username).subscribe((response) => {
        this.fileData  = {
          "_id" : response.response.finalData._id,
          "username" : response.response.finalData.username,
          "timestamp" : response.response.finalData.timestamp,
          "file" : response.response.finalData.file,
          "fileUrl": expressUrls.fileAccess+response.response.finalData.file.filePath,
          "toggle":false
        }
        this.callbackFileData();
      });
    } 
  })
  {
    callbackfile();
    // callbackCode2();
  }
  callbackFileData=()=>{

    //============================saving ang getting data from socket start=============================//

    this.generalChatService.sendFile(this.fileData);
  }
  player: any;
  savePlayer (player) {
    this.player = player;

  }
  downloadCode(codeId)
  {
    this.codeId=codeId;
    this.generalService.getCodeDatasById(this.codeId)
    .subscribe((code:any)=>{
      let imageBlob = new Blob([code[0].code.code],{ type : 'text/plain' })
      let filename = code[0].code.title+'.'+code[0].code.language;
      this.downloadCodeTesting=code;
      FileSaver.saveAs(imageBlob, filename);
    })
  }

  //============================ callback in messages start==================================//

  sendMessage(callback=()=>{
    if(this.message!='')
    {
      this.dbmessage.message=this.message;
      this.message='';
    }
    if(this.dbmessage.message.includes('https://youtu.be/')==true){
      this.dbmessage.id=this.dbmessage.message.substr(17);
      this.messages.push(this.dbmessage);
      this.message = null;
      this.generalService.saveMessage(this.username,this.dbmessage)
      .subscribe((current: string) => {
        this.socketSave();
        this.dbmessage={};
        this.saveMessageTesting=current;
      });
    }else if(this.dbmessage.message.includes('https:')==true || this.dbmessage.message.includes('http:')==true){
      this.saveMessageTesting=null;
      this.url=this.dbmessage.message.substring(this.dbmessage.message.indexOf('http'));
      this.chatService.scraping(this.url, ( error , response)=>{
        if(!response.error) {
          this.scrapingData=response;
          this.dbmessage.title=this.scrapingData.other.title;
          this.dbmessage.description=this.scrapingData.other.description;
          if(this.scrapingData.ogp==undefined){
            this.generalService.saveMessage(this.username,this.dbmessage)
            .subscribe((current: string) => {
              this.socketSave();
              this.dbmessage={};
              this.saveMessageTesting=current;
            });
          }else{
            if(this.scrapingData.ogp.ogImage[0].url==undefined){
              this.dbmessage.image=this.scrapingData.twitter.twitterImage[0].url;
            }else{
              this.dbmessage.image=this.scrapingData.ogp.ogImage[0].url;
            }
            this.generalService.saveMessage(this.username,this.dbmessage)
            .subscribe((current: string) => {
              this.socketSave();
              this.dbmessage={};
            });              }
          }
        })
    }else{
      this.generalService.saveMessage(this.username,this.dbmessage)
      .subscribe((current: string) => {
        this.socketSave();
        this.saveMessageTesting=current;
      });
    }
  })
  {
    callback();
    // callback2();
  }
  socketSave=()=>{
    let data={
      "username":this.username,
      "message":this.dbmessage,
    }

    //==========================sends and gets the message to the socket.io start================================//

    this.generalChatService.sendMessage(data);
    this.generalChatService.getCurrent()
    .subscribe((current: string) => {
      if(current){
      }
      this.currentUser=current;
    });

  }
  // get room name from dropdown and the service
  room(room):any{
    this.chatroom=room;
    this.generalChatService.chatRoom();
    this.generalChatService.getChatRoom();
  }
  sendUserName(){
    this.generalChatService.sendUser(this.username);
    this.userfinal=this.username;
  }
  disconnectUser(){
    this.generalChatService.disconnectUsers();
  }
  //getting all the general channel saved messages from the db
  retreive(){
    this.generalService.retrieveMessage().subscribe((generalmessage) => {
      let  aa=generalmessage.map((i)=>{
        if(i.message==undefined){
          this.getCodeData();
          if(i.file!=undefined){i.fileUrl = expressUrls.fileAccess+i.file.filePath;i.toggle=false}
        }else{
          if(i.message.message.includes('https://youtu.be/')==true){

            i.message.id=i.message.message.substr(17);

          }else{

            i.message.id=null;
          }
        }
        return i;            
      });
      this.allGeneralMessages=generalmessage;
      this.retreiveMsgDataComponent=generalmessage;
    });
  }

  languageSelect(lang){
    console.log(lang, "check language type!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.data.language=lang;
    this.data.username=this.username;
  }

  //======================= callback for code start=============================//

  sendCodeData(callbackcode=()=>{

    //====================== saving the data to db start============================//

    let id = Math.floor((Math.random() * 100000000) + 1);
    this.data.codeId=id;
    this.generalService.saveCode(this.data)
    .subscribe((code: string) => {
      this.callbackCodeData();
      this.sendCodeDataComponent=code;
    });
    this.generalChatService.getCurrent()
    .subscribe((current: string) => {
      if(current){
      }
      this.currentUser=current;
    });
  })

  {
    callbackcode();
    // callbackCode2();
  }
  callbackCodeData=()=>{

    //============================saving ang getting data from socket start============================//

    this.generalChatService.sendCode(this.data);
    this.generalChatService.getCode()
    .subscribe((code: string) => {
      this.getCodeData();

    });
  }
  getCodeData(){
    this.generalService.getCodeDatas()
    .subscribe((code: string) => {
    });
  }
  ngOnInit() {
     setTimeout( () =>{
        document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
      },100);  
    this.retreive();
    this.userId=localStorage.getItem('id');
    if(this.userId === '' || typeof this.userId == 'undefined') {
      this.router.navigate(['/']);
    }else{

      this.chatService.userSessionCheck(this.userId,( error, response )=>{
        if(error) {
          this.router.navigate(['/']); /* Home page redirection */
        }else{

          this.username = response.username;
          this.sendUserName();
        }
      }
      )}

      // getting message through sockrt io
      this.generalChatService
      .getMessages()
      .subscribe((message: string) => {
        if(message){
        }
      });
      this.generalChatService.getUserName()
      .subscribe((message: string) => {
        let currentTime = moment().format('hh:mm:ss a');
        let messageWithTimestamp =  `${currentTime}: ${message}`;
        this.serveruser=message;
      });



    }


  }

