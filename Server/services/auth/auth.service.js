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
        const user = await User.findOne({ email: email});
        if(!user) throw "Email doens't not exist";
        let token = crypto.randomBytes(16).toString('hex');
        await User.findByIdAndUpdate({_id:user._id }, { resetToken: token });
        let text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://localhost:3000/reset-password/token?' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n';
        mailerService.sendEmail(email, "Password Reset", text);
}

async function resetPassword(token, new_pass) {
    let user = await User.findOne({ resetToken: token });
    if (!user) throw "Invalid reset token";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_pass, salt);
    user.resetToken = undefined;
    user.password = hashedPassword;
     await user.save();
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
