
/*===================importing modules======================*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as config from './config/multi_en_config.json';
import { ChatService } from './../chat.service';
import { HttpService } from './../http.service';
import {User} from './../User';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css'],
providers : [ChatService,HttpService]
})
export class LoginComponent{

/*================ declereation of variable=====================*/

public word= (<any>config).login;
private username = null;
private email = null;
private password = null;
private isuserNameAvailable = false;
private userTypingTimeout= 500;
private typingTimer = null;
user:User;
constructor(
private chatService : ChatService,
private router :Router
){ }

public onkeyup(event){
clearTimeout(this.typingTimer);
this.typingTimer = setTimeout( ()=>{
this.chatService.checkUserNameCheck({
'username' : this.username
}, (response)=>{
if(response.error) {
this.isuserNameAvailable = true;
}else{
this.isuserNameAvailable = false;
}
});
}, this.userTypingTimeout);
}
public onkeydown(event){
clearTimeout(this.typingTimer);
}

/*===============login function=================*/

public login():void{
if(this.username === '' || this.username === null) {
alert(`Username can't be empty.`);
}else if(this.password === '' || this.password === null ){
alert(`Password can't be empty.`);
}else{
this.chatService.login({
'username' : this.username,
'password' : this.password,
},(error , result)=>{
if(error) {
alert(result);
}else{
if(!result.error) {

/*==============store id in local storage===============*/

localStorage.setItem("id",result.userId)
this.router.navigate(['/dashboard/']);
}else{
alert(`Invalid Credentials`);
}
}
});
}
}

//save method//
 save(model: User, isValid: boolean) {
   // call API to save customer

 }

}