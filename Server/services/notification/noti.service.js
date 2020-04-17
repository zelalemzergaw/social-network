const WebSocket = require("ws"),
      { User , Post} = require('../../models'),
      { notiTypes } = require('../../util');

function isUserOnline(ws) {
    return ws && ws.readyState === WebSocket.OPEN;
}


async function sendNotification(ids, notification, app) {
    ids.forEach(id => {
        if(isUserOnline(app.locals.users[id])) {
            app.locals.users[id].send(JSON.stringify(notification));
        }
       
    });
}

function getActiveUsers(followers, app) {
    const activeIds = Object.keys(app.locals.users);
    const actiFollowers = activeIds.filter(id => followers.includes(id)); 
    return actiFollowers;
}

async function getMyFollowers(id) {
    let user = await User.findOne({_id: id});
    return user.followers.map(f => f.followerID);
}

async function addNotification(ids, notification) {
   ids.forEach(async(id) => {
       await User.updateOne({_id: id}, { 
                $push: { notifications: notification}
            });
   });
    

}

async function newPostNotification(userId, post, app) {
    let u = await User.findById({_id: userId});
    let followers = await getMyFollowers(userId);
    let actiFollowers =  getActiveUsers(followers, app);


    let noti = {
        notiType: notiTypes.NEW_POST,
        message: u.username + " posted on his timeline",
        post: post._id
    };
    sendNotification(followers, noti, app);
    await addNotification(actiFollowers, noti);
}


async function commentNotification(userId, postId, app) {
    let post = await Post.findById({_id: postId});
    if(post.postedBy == userId) return
    let u = await User.findById({_id: userId});
    let noti = {
        notiType: notiTypes.LIKE_POST,
        message: u.username + " commented on your post",
        user: userId,
        post: post._id
    };

    let activeU =  getActiveUsers([post.postedBy], app);
    console.log("ACTIVE", activeU, post.postedBy, Object.keys(app.locals.users));
    if(activeU) {
        sendNotification([post.postedBy], noti, app);
    }
   await addNotification([post.postedBy], noti);
}

async function likeNotification(userId, postId, app) {
    let post = await Post.findById({_id: postId});
    if(post.postedBy == userId) return
    let u = await User.findById({_id: userId});

    let noti = {
        notiType: notiTypes.COMMENT_POST,
        message: u.username + "  liked  your post",
        user: userId,
        post: post._id
    };

    let activeU =  getActiveUsers([post.postedBy], app);
    sendNotification([post.postedBy], noti, app);
   await addNotification([post.postedBy], noti);
}

async function badPostNotification(userId, post, app) {
    let u = await User.findById({_id: userId});
    let notiU = {
        notiType: notiTypes.POST_FLAGGED,
        message: "Your post has inappropriate content",
        post: post._id
    };

    let notiA = {
        notiType: notiTypes.POST_FLAGGED,
        message: u.username + "posted inappropriate content ",
        user: userId,
        post: post._id
    };

    sendNotification([userId], notiU, app);
   await addNotification([userId], notiU);
    let admin = await User.findOne({role: "ADMIN"});
    if(admin) {
        sendNotification([admin._id], notiA, app);
        addNotification([admin._id], notiA);
    }
    
    
}

async function followNotification(userId, followedId, app) {
    let u = await User.findById({_id: userId});

    let noti = {
        notiType: notiTypes.FOLLOW_USER,
        message: u.username + " followed you ",
        user: userId,
    };

    sendNotification([followedId], noti, app);
   await addNotification([followedId], noti);
}

module.exports = {
    newPostNotification,
    commentNotification,
    likeNotification,
    badPostNotification,
    followNotification
}