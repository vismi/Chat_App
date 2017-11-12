  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';
  import { SocketService } from './socket.service';
  import { HttpService } from './http.service';
  import { ChatService } from './chat.service';
  import {WelcomeComponent} from './welcome/welcome.component';
  import { GeneralComponent } from './dashboard/general/general.component';
  import {VideoCallComponent} from './dashboard/chats/video-call/video-call.component'; 
  import { appRouting } from './app.routing'; 
  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './register/register.component';
  import  {MailverificationComponent} from './mailverification/mailverification.component';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { ChatsComponent } from './dashboard/chats/chats.component';
  import {GetInfoService} from './shared/get-info.service';
  import { NotFoundComponent } from './not-found/not-found.component';
  import { RegisterService} from './shared/register.service';
  import { MailotpService} from './shared/mailotp.service';
  import { YoutubePlayerModule } from 'ng2-youtube-player';
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  import { ForgetPassComponent} from './forget-pass/forget-pass.component';
  import { SetPasswordComponent} from './set-password/set-password.component'; 
  import { AccountSettingsComponent } from './dashboard/account-settings/account-settings.component';
  import { FileTransferGlobalService } from './shared/file-transfer-global.service'
  import { AvatarModule } from "ng2-avatar";
  import { EqualValidator } from './register/password.match.directive';
  import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
  import {PrivateChannelService} from './shared/private-channel.service';
import { PrivateChannelComponent } from './dashboard/private-channel/private-channel.component';
import {PrivateChannellService} from './dashboard/private-channel/private-channel.service';

  @NgModule({
    declarations: [
    AppComponent,
    RegisterComponent,
    MailverificationComponent,
    LoginComponent,
    DashboardComponent,

    NotFoundComponent,
    GeneralComponent,
    ChatsComponent,
    VideoCallComponent,
    WelcomeComponent,
    AccountSettingsComponent,
    ForgetPassComponent,
    SetPasswordComponent,

    EqualValidator,
    PrivateChannelComponent
    ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,

    YoutubePlayerModule,
    AvatarModule,
    AngularMultiSelectModule
    ],
   providers: [
    RegisterService,
    MailotpService,
    SocketService,
    HttpService,
    ChatService,
    GetInfoService,
    FileTransferGlobalService,
    PrivateChannelService,
    PrivateChannellService
     ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  platformBrowserDynamic().bootstrapModule(AppModule);