
//==============================Importing Modules=================================//

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailotpService} from '../shared/mailotp.service';
import { RegisterService } from '../shared/register.service';

import * as config from './config/multi_en_config.json';
@Component({
selector: 'app-mailverification',
templateUrl: './mailverification.component.html',
styleUrls: ['./mailverification.component.css']
})

//========================Exporting class MailverificationComponent==============//

export class MailverificationComponent implements OnInit {
public word= (<any>config).mail;

constructor(private route:Router,private mailotp:MailotpService,private registerUser:RegisterService,) { }
valid:boolean = false;

//==========================verify method=======================================//

verify(otp){
this.mailotp.checkOTP(otp).subscribe((res)=>{
this.valid=res.message; 
if(this.valid==true)
{

let comp = this.mailotp.component;
if(comp==="login"){
this.registerUser.register().subscribe(
(res)=>{
if(res.error==false)
{
if(res.message=="Already exist"){               
// swal('Oops!','You are already registered with us!','info')
this.route.navigateByUrl("/"+comp);
}
else if(res.message=="User registration successful."){
// swal('Wohoo!','You are now registered with us!','success')
this.route.navigateByUrl("/"+comp);
}
}
else{
// swal('Oops!','Registeration Unsuccessful.','info')
this.route.navigateByUrl("/register");
}
});
}else if(comp==="setpassword"){
this.route.navigateByUrl("/setpassword");     
}else{}
}
else
{
// swal('Oops!','Registeration Incomplete, try again?','info');
this.route.navigateByUrl('/register');
}    
}); 
}
ngOnInit() {}

}


