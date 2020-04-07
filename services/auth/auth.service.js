const
     path = require('path'),
     bcrypt = require('bcryptjs'),
     jwt = require('jsonwebtoken'),
     { User, Post, Ad } = require(path.join(__dirname,'..', '..', 'models'));


async function signup(data) {
    const user = await User.findOne({ username: data.username });
    if (user) {
        throw "Username " + data.username + " is already taken";
    }

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
}

async function login(username, password ) {

    const user = await User.findOne({ username });
    if(!user) throw "User doesn't exist!";

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw "Invalid password";

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 });

    return {
         "access_token": token,
          ...user._doc
        }


}

function resetPassword() {

}


function updateProfile() {

}

module.exports = {
    signup,
    login,
    resetPassword,
    updateProfile
}
