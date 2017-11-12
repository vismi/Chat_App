
//=================== importing modules=========================//

import { Component, OnInit, ElementRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountSettingsService} from './account-settings.service';
import { GetInfoService} from '../../shared/get-info.service';
import { SocketService } from './../../socket.service';
import * as config from './config/multi_en_config.json';
import { User } from '../../User';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
selector: 'app-account-settings',
templateUrl: './account-settings.component.html',
styleUrls: ['./account-settings.component.css'],
providers:[AccountSettingsService,GetInfoService]
})
export class AccountSettingsComponent implements OnInit {
constructor(private accSettings:AccountSettingsService, 
private el: ElementRef, 
private domSanitizer: DomSanitizer,
private socketService : SocketService) { }
userData:any={"status":"notDefined"}
user:User;
ngOnInit() {
this.accSettings.fetchUserInfo(localStorage.getItem('id')).subscribe((res)=>{
this.userData=res.result;
})
 this.user = {
      oldPassword:'',
      newPassword: '',
      confNewPassword:''
    } 
}

  //save method//
  save(model: User, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
  }
// ========================declearation of variable==================//

newPassword:string;
oldPassword:string;
confNewPassword:string;
newContact:number;
newStatus:string;
public word= (<any>config).accountSettings;
updatePassword(newPassword:any, oldPassword:any){
if(this.confNewPassword==this.newPassword){this.accSettings.updatePassword({"id":this.userData._id, "newPassword":newPassword,"oldPassword":oldPassword})
.subscribe((res)=>{
})}
}
updateContact(contact:any){
this.accSettings.updateContact({"id":this.userData._id, "contact":this.userData.contact})
.subscribe((res)=>{
})
}
updateStatus(){
this.accSettings.updateStatus({"id":this.userData._id, "status":this.userData.status})
.subscribe((res)=>{
this.getUserData();
})
}
isOnline(toggleOnOff:any){
this.accSettings.isOnline({"id":this.userData._id})
.subscribe((res)=>{
})
}
isOffline(toggleOnOff:any){
this.accSettings.isOffline({"id":this.userData._id})
.subscribe((res)=>{
})
}

//=======================this will get the upload the selected file========================//

userUpload() {
let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
let fileCount: number = inputEl.files.length;
let formData = new FormData();
if(fileCount > 0)
{
formData.append('file', inputEl.files.item(0));
this.accSettings.updateProfilePhoto(formData, this.userData._id).subscribe((response) => {
this.getUserData();
});
} 
}
profilePhoto : string;
myReader:any;

// ======================get user data function=================//

getUserData()
{
this.accSettings.fetchUserInfo(localStorage.getItem('id')).subscribe((res)=>{
this.userData=res.result;
this.accSettings.userProfile(res);

})
}


}
