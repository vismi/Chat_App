
//====================Importing Modules==========================//

import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ForgetPassComponent } from './forget-pass.component';
import { ForgetPassService } from  './forget-pass.service';
import { MailotpService} from '../shared/mailotp.service';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import * as config from './forget-pass.test.config.json';

describe('Forget Pass Component', () => {

/*============== Initialise all the variabless================== */


let data:any;
let dataotp:any;
let comp: ForgetPassComponent;
let fixture: ComponentFixture<ForgetPassComponent>;
let de: DebugElement;
let el: HTMLElement;
let service:ForgetPassService;
let serviceotp : MailotpService;
let spy:any;
let word= (<any>config);

beforeEach(async(() => {
word.data;
word.dataotp;
TestBed.configureTestingModule({
imports : [
FormsModule, HttpModule, RouterTestingModule
],
declarations: [
ForgetPassComponent
],
providers : [{ provide : ForgetPassService},{ provide : MailotpService} ]
})
.compileComponents();

/*================Create the test bed=======================*/

fixture = TestBed.createComponent(ForgetPassComponent);
comp = fixture.componentInstance;
service = fixture.debugElement.injector.get(ForgetPassService);
de = fixture.debugElement.query(By.css('input'));
el = de.nativeElement;
})); 

it('Component definition', ()=>{
expect(comp).toBeDefined();
})  

/*====================Mail verification successfull===================*/

it("mail verification successfull", ()=>{

spy=spyOn(service, 'verifyEmail').and.returnValue(Observable.of({"result":{"email":word.data.email}}));
spy=spyOn(service, 'verifyData').and.returnValue(Observable.of({message:"mail OTP Sent"}));
comp.verifyEmail("prernathanai@gmail.com");
fixture.detectChanges();
expect(comp.values.email).toEqual(word.data.email);
expect(comp.result).toEqual({ message: 'mail OTP Sent' })
}); 

/*====================Mail verification unsuccessfull===================*/

it("mail verification not successfull", ()=>{

spy=spyOn(service, 'verifyEmail').and.returnValue(Observable.of({"result":{"email":undefined}}));
comp.verifyEmail("prernathanai@gmail.com");
fixture.detectChanges();
expect(comp.values.email).toEqual(undefined);
})
}); 

