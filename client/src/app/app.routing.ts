import { ModuleWithProviders } from '@angular/core';
 
import { Routes , RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import  {MailverificationComponent} from './mailverification/mailverification.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { ChatsComponent } from './dashboard/chats/chats.component'; 
import {VideoCallComponent} from './dashboard/chats/video-call/video-call.component';
import { GeneralComponent } from './dashboard/general/general.component';
import {WelcomeComponent} from './welcome/welcome.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { SetPasswordComponent} from './set-password/set-password.component';
import { AccountSettingsComponent } from './dashboard/account-settings/account-settings.component'
import { PrivateChannelComponent } from './dashboard/private-channel/private-channel.component';

const appRoutes :Routes = [
	{ path : '' ,redirectTo:'welcome',pathMatch:'full'},
	{ path : 'welcome' , component : WelcomeComponent},
	{ path : 'login' , component : LoginComponent},
	{ path : 'dashboard' , component : DashboardComponent,
		children:
			[	{path:'accountSettings', component:AccountSettingsComponent},
				{path : '' ,redirectTo:'general',pathMatch:'full'},
				{path:'general',component:GeneralComponent},
				{path:'video',component:VideoCallComponent},
				{path:'privatechannel/:channelId',component:PrivateChannelComponent},
				{path:'chats',component:ChatsComponent,
					children:
						[ {path:'video',component:VideoCallComponent}]}		
			]},
	{ path:'register' , component : RegisterComponent},
	{ path:'forgetPass',component:ForgetPassComponent},
  { path:'setpassword', component:SetPasswordComponent},
	{ path:'verify',component:MailverificationComponent},

	{ path : '**' , component : NotFoundComponent},
];
 
export const appRouting :ModuleWithProviders = RouterModule.forRoot(appRoutes); 