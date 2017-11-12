const port='4000';

//const localhost='http://192.168.252.186:'+port;
const localhost='http://localhost:'+port;
export default{
	"reset":localhost+'/reset',
	"forget":localhost+'/forgotPass/',
	"login":localhost+'/login',
	"upload":localhost+'/upload/',
	"updatePassword":localhost+'/updateUserData/updatePassword',
	"updateContact":localhost+'/updateUserData/updateContact',
	"updateStatus":localhost+'/updateUserData/updateStatus',
	"isOnline":localhost+'/updateUserData/isOnline',
	"isOffline":localhost+'/isOffline',
	"updateProfilePhoto":localhost+'/updateUserData/updateProfilePhoto/',
	"saveMessage":localhost+'/generalChats',
	"saveCode":localhost+'/generalChats',
	"getCodeDatas":localhost+'/generalChats',      
	"getCodeDatasById":localhost+'/generalChats/Id/',
	"retrieveMessage":localhost+'/generalChats',
	"scraping":localhost+'/unfurl',
	"resetFlag":localhost+'/users',
	"fileAccess":localhost+"/file/",
	"profilePhotoAccess":localhost+"/profile_picture/",
	"localhost":localhost

	
}