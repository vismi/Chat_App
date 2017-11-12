
'use strict';
var Helper =  (function () {
    function Helper() {
        this.Mongodb = require("./db");
    }
    Helper.prototype.userNameCheck = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').find(data).count(function (err, result) {
                db.close();
                callback(result);
            });
        });
    };

    Helper.prototype.saveChannelMessage = function (data, callback) {

        this.Mongodb.onConnect(function (db, ObjectID) {
           db.collection('channels').update({_id:ObjectID(data.channelId)}
               ,{$addToSet:{'messages':{"channelMessage":data.channelMessage
               ,"messageSender":data.messageSender,"sendTime":data.sendTime,"messageSenderName":data.messageSenderName}}},
               {strict:false,upsert:true}, function (err, result) {
                   db.close();
                   callback(err, result.result);
               });
       });
    };

    Helper.prototype.login = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').findAndModify(data, [], { $set: { 'online': 'Y' } }, {}, function (err, result) {
                db.close();
                callback(err, result.value);
            });
        });
    };

    Helper.prototype.saveChannel = function (data, callback) {
        let channelId;
        let flag=0;
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('channels').findOne({"channelName":data.channelName}, function (err, result) {

                if(result===null)
                {
                    db.collection('channels').insertOne({'channelName':data.channelName,'channelPurpose':data.channelPurpose}, function (err, resp)
                    {
                        if(resp)
                        {
                            channelId=resp.insertedId;
                            db.collection('channels').update({_id:ObjectID(channelId)},
                                {$addToSet:{'messages':{    
                                    "channelMessage" : "hey! Welcome To " + data.channelName,
                                    "messageSender" : data.channelMembers,
                                    "sendTime" : Date.now(),
                                    "messageSenderName" : "Glib"
                                }}},{strict:false},
                                function(err,data){
                                })

                            data.channelMembers.map((i)=>{

                                db.collection('users').update({_id:ObjectID(i.id)},
                                    {$addToSet:{'channels':{'channelId':channelId}}},{strict:false},
                                    function(err,data){
                                    })
                            });
                            db.close();
                            callback(err, "channel has been added to users ");
                        }
                    }
                    );


                }
                else{
                    db.close();
                    callback(err, result);
                }
            });
        });
    };


    Helper.prototype.registerUser = function (data, callback) {
        this.Mongodb.onConnect(function (db, ObjectID) {
            db.collection('users').insertOne(data, function (err, result) {
                db.close();
                callback(err, result);
            });
        });
    };

    Helper.prototype.resetFlag = function (data, callback) {
       this.Mongodb.onConnect(function (db, ObjectID) {
           db.collection('users').update({_id:ObjectID(data.toId),
            "reciever":{$elemMatch:{fromId:data.fromId}}},
            {$set:{"reciever.$.flag":0}},{strict:false},
            function(err,result){
                db.close();
                callback(err, result);
            }
            )
       });
   };

   Helper.prototype.setFlag = function (data, callback) {
     this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').findOne({_id:ObjectID(data.toId)}, function (err, result) {
         if(result){

             if(result.reciever===undefined)
             {
                 db.collection("users").update({_id:ObjectID(data.toId)}
                    ,{$addToSet:{"reciever":{"fromId":data.fromId,"flag":1}}},{strict:false}
                    ,function(err,result){
                        db.close();
                        callback(err, result);
                    })
             }
             else{
                 let fromIdArray=result.reciever.map(i=>i.fromId);
                 if(fromIdArray.includes(data.fromId)){
                    db.collection('users').update({_id:ObjectID(data.toId),
                        "reciever":{$elemMatch:{fromId:data.fromId}}},
                        {$inc:{"reciever.$.flag":1}},{strict:false},
                        function(err,result){
                                   
                                    db.close();
                                    callback(err, result);
                                }
                                )
                }
                else{
                   db.collection("users").update({_id:ObjectID(data.toId)}
                    ,{$addToSet:{"reciever":{"fromId":data.fromId,"flag":1}}},{strict:false}
                    ,function(err,result){
                        db.close();
                        callback(err, result);
                    })

               }
           }

       }
   });
    });
 };
 Helper.prototype.userSessionCheck = function (data, callback) {

    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').findOne({ _id: ObjectID(data.userId), online: 'Y' }, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};

Helper.prototype.getChannelInfo = function (channelId, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('channels').findOne({ _id: ObjectID(channelId) }, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
}

Helper.prototype.getChannelData = function (channelId, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('channels').findOne({ _id: ObjectID(channelId) }, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
}

Helper.prototype.getUserInfo = function (userId, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').findOne({ _id: ObjectID(userId) }, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};
Helper.prototype.addSocketId = function (data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').update({ _id: ObjectID(data.id) }, data.value, function (err, result) {
            db.close();
            callback(err, result.result);
        });
    });
};
Helper.prototype.getChatList = function (userId, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').find({ 'online': 'Y', socketId: { $ne: userId } }).toArray(function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};
Helper.prototype.insertMessages = function (data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
     db.collection('messages').insertOne(data, function (err, result) {
         db.close();
         callback(err, result);
     });
 });
};
Helper.prototype.insertToGeneral = function (data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('general').insertOne(data, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};
Helper.prototype.getfromGeneral = function (callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('general').find({}).toArray(function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};


/*To get the code snippet from db on click of download button*/
Helper.prototype.getfromGeneralId = function (data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {

        db.collection('general').find({"code.codeId":parseInt(data.codeId)}).toArray(function (err, result) {

            if(result)
            { 
             db.close();
             callback(err, result);
         }
     });
    });
};


Helper.prototype.getUsers = function (callback) {  
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').find({}).toArray(function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};

Helper.prototype.getMessages = function (userId, toUserId, callback) {
    var data = {
        '$or': [

        { '$and': [
        {
            'toUserId': userId
        }, {
            'fromUserId': toUserId
        }
        ]
    }, {
        '$and': [
        {
            'toUserId': toUserId
        }, {
            'fromUserId': userId
        }
        ]
    },
    ]
};
this.Mongodb.onConnect(function (db, ObjectID) {
    db.collection('messages').find(data).sort({ 'timestamp': 1 }).toArray(function (err, result) {
        db.close();
        callback(err, result);
    });
});
};
Helper.prototype.logout = function (userID, isSocketId, callback) {
    var data = {
        $set: {
            online: 'N'
        }
    };
    this.Mongodb.onConnect(function (db, ObjectID) {
        var condition = {};
        if (isSocketId) {
            condition.socketId = userID;
        }
        else {
            condition._id = ObjectID(userID);
        }
        db.collection('users').update(condition, data, function (err, result) {
            db.close();
            callback(err, result.result);
        });
    });
};
Helper.prototype.verifyForgotPassword = function (email, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').findOne({"email": email }, function (err, result) {

            db.close();
            callback(err, result);
        });
    });
};
Helper.prototype.forgotPassword = function (email, password, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        db.collection('users').update({"email": email },{$set: {"password":password}}, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};
Helper.prototype.updateUserData = function (params, data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
        let paramsObj={}

        if(params.oldPassword){

            paramsObj={_id:ObjectID(params.id),password:params.oldPassword};

        }

        else{paramsObj={_id:ObjectID(params.id)};}
        db.collection('users').updateOne(paramsObj, data, function (err, result) {
            db.close();
            callback(err, result);
        });
    });
};

Helper.prototype.uploadFileGeneral = function ( data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
     db.collection('general').insertOne( data, function (err, result) {
        db.close();
        callback(err, result);
    });
 });
};

Helper.prototype.uploadFileOneOne = function ( data, callback) {
    this.Mongodb.onConnect(function (db, ObjectID) {
     db.collection('messages').insertOne( data, function (err, result) {
        db.close();
        callback(err, result);
    });
 });
};
return Helper;
}());
module.exports = new Helper();
