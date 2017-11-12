
'use strict';
var path = require('path');
var helper = require('./helper');
var Socket = /** @class */ (function () {
    let usernames=[];
    function Socket(socket) {
        this.io = socket;
    }
    Socket.prototype.socketEvents = function () {
        var _this = this;
        this.io.on('connection', function (socket) {

 //GET FILE

 socket.on('send-file', (file) => {
  _this.io.emit('file-emitted', file);
      // socket.broadcast.emit('codes', code);
  });


    //get the code
    socket.on('new-code', (code) => {
      _this.io.emit('codes', code);
      // socket.broadcast.emit('codes', code);
  });

    socket.on('chat-rooms-join', (channelid) => {
        socket.join(channelid.channelId);
    });

    socket.on('chat-room-leave', (channelid) => {
        
        socket.leave(channelid);
    });

    socket.on('private-channel-message', (channelData) => {
        let modifiedChannelMessage={
            channelMessage: channelData.channelMessage, 
            messageSender: channelData.messageSender, 
            sendTime: Date.now(),
            messageSenderName:channelData.messageSenderName
        };

        _this.io.to(channelData.channelId).emit('channel-message',modifiedChannelMessage);

    });

    socket.on('broadcastChannelName',(channelName)=>{
        _this.io.emit('broadcastChannelName',channelName);
    })

    socket.on('new-user',function(data,callback){
        if(usernames.indexOf(data)!= -1){
            callback(false);
        }
        else{
            callback(true);
            socket.username=data;
            
            usernames.push(socket.username);
            _this.io.emit('username',usernames);
        }
    });

    socket.on('new-message', (message) => {
        message.time=Date.now();
        _this.io.emit('new-message', message);
        
        
    });


    socket.on('getcurrentuser',()=>{
        
        _this.io.emit("usercurrent",socket.username)

    });

            /**
            * get the user's Chat list
            */
            socket.on('chat-list', function (data) {
                var chatListResponse = {};
                if (data.userId == '') {
                    chatListResponse.error = true;
                    chatListResponse.message = "User does not exits.";
                    _this.io.emit('chat-list-response', chatListResponse);
                }
                else {

                    helper.getUserInfo(data.userId, function (err, UserInfoResponse) {
                        delete UserInfoResponse.password;

                        
                        helper.getChatList(socket.id, function (err, response) {
                            _this.io.to(socket.id).emit('chat-list-response', {
                                error: false,
                                singleUser: false,
                                chatList: response
                            });
                            socket.broadcast.emit('chat-list-response', {
                                error: false,
                                singleUser: true,
                                chatList: UserInfoResponse
                            });
                        });
                    });
                }
            });

            socket.on('user-list', function (data) {
                console.log("socket user list")
                var chatListResponse = {};
                helper.getUsers(function (err, response) {
                    console.log("response of get User",response)
                    socket.broadcast.emit('user-list-response',response);

                });
            });
            
            
            /**
            * send the messages to the user
            */
            socket.on('add-message', function (data) {
                if (data.message === '') {
                    _this.io.to(socket.id).emit("add-message-response", "Message cant be empty");
                }
                else if (data.fromUserId === '') {
                    _this.io.to(socket.id).emit("add-message-response", "Unexpected error, Login again.");
                }
                else if (data.toUserId === '') {
                    _this.io.to(socket.id).emit("add-message-response", "Select a user to chat.");
                }
                else {
                    var toSocketId_1 = data.toSocketId;
                    var fromSocketId = data.fromSocketId;
                    delete data.toSocketId;
                    data.timestamp = Math.floor(new Date() / 1000);
                    helper.insertMessages(data, function (error, response) {
                        
                        _this.io.to(toSocketId_1).emit("add-message-response", data);
                    });
                }
            });

            socket.on('get-flag', function (data) {
             var userData={
                userId:data.userId,
                toSocketId_1:data.toSocketId
            }     

            helper.userSessionCheck(userData, function (error, response) {

                _this.io.to(userData.toSocketId_1).emit("get-flag-response", response);
            });
        });


            socket.on('video-chat',function(data){

                var userData={
                   userId:data.userId,
                   toSocketId_1:data.socketId,
                   toId:data.toId,
                   username:data.username,
                   mySocketId:data.mySocketId

               }
               _this.io.to(userData.toSocketId_1).emit("get-video-response",userData);


           });

            /**
            * Logout the user
            */
            socket.on('logout', function (data) {
                var userId = data.userId;
                helper.logout(userId, false, function (error, result) {
                    _this.io.to(socket.id).emit('logout-response', {
                        error: false
                    });
                    socket.broadcast.emit('chat-list-response', {
                        error: false,
                        userDisconnected: true,
                        socketId: socket.id
                    });
                });
            });

            socket.on('disconnect', function () {
                console.log("dissconnect user",socket.username);
                let index=usernames.indexOf(socket.username);

                usernames.splice(index,1);

                socket.broadcast.emit('chat-list-response', {
                    error: false,
                    userDisconnected: true,
                    socketId: socket.id
                });
            });
        });
};
Socket.prototype.socketConfig = function () {
    this.io.use(function (socket, next) {
        var userID = socket.request._query['userId'];
        var userSocketId = socket.id;
        var data = {
            id: userID,
            value: {
                $set: {
                    socketId: userSocketId,
                    online: 'Y'
                }
            }
        };
        helper.addSocketId(data, function (error, response) {
        });
        next();
    });
    this.socketEvents();
};
return Socket;
}());
module.exports = Socket;
