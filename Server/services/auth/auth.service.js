const
     path = require('path'),
     bcrypt = require('bcryptjs'),
     jwt = require('jsonwebtoken'),
     crypto = require('crypto'),
     { ApiResponse } = require(path.join(__dirname, "..", "..", "util")),
     { User, Post, Ad } = require(path.join(__dirname,'..', '..', 'models')),
     { mailerService } = require(path.join(__dirname, '..', 'shared'));


async function signup(data) {
    const user = await User.findOne({ username: data.username });
    if (user) return  new ApiResponse(401, "error", {err: "Username alaready taken"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const u =  new User({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email,
            birthdate: data.birthdate,
            location: data.location,
            password: hashedPassword
        });
    await u.save()
    return new ApiResponse(200, "success", {});

}

async function login(username, password ) {

    const user = await User.findOne({ username });
    if(!user) return new ApiResponse(401, "error", {err: "Username doesn't exists"});

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return new ApiResponse(401, "error", {err:"Invalid password"})

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 });
    let result = {
        "access_token": token,
         ...user._doc
       };
    return new ApiResponse(200, "success", result); 
         
        


}

async function forgotPassword(email) {
       console.log("received ", email);
        const user = await User.findOne({ email: email});
        console.log("USER", user);
        if(!user) {
            return new ApiResponse(401, "error", {err: email + " doens't not exists. please enter a correct email address"});
        }
        let token = crypto.randomBytes(16).toString('hex');
        await User.updateOne({_id:user._id }, {$set:{ resetToken: token }});
        let text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
         process.env.FRONT_END_URL + "/new-password/" +token+
        ' If you did not request this, please ignore this email and your password will remain unchanged.\n';
        mailerService.sendEmail(email, "Password Reset", text);
        return new ApiResponse(200, "success", {message: "We have sent you a reset link on your email address"});
}

async function resetPassword(token, new_pass) {
    let user = await User.findOne({ resetToken: token });
    if (!user) {
        return new ApiResponse(401, "error", {err: "Invalid reset link"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_pass, salt);
    user.resetToken = undefined;
    user.password = hashedPassword;
    await user.save();
    return new ApiResponse(200, "success", {message: "You have successfully changed your password"});
}


function updateProfile() {

}

module.exports = {
    signup,
    login,
    resetPassword,
    forgotPassword,
    updateProfile
}
