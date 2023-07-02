const passport = require("passport");
const { Strategy } = require("passport-local");
const ComparePasswords = require("../PasswordHasher");
const User = require("../Model/userModel")

passport.serializeUser((user,done)=>{
    console.log("Serializing User...");
    console.log(user);
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    console.log("Deserializing User...");
    console.log(id)

    try {
        const user = await User.findById(id)
        if(!user) throw new Error ("User not Found");
        console.log(user)
        done(null, user)
    } catch (error) {
        console.log(error);
        done(null,null)   
    }
})

passport.use(
    new Strategy(
        {
            usernameField:"Username",
            passwordField :"Password"
        },
        async(username, password, done) =>{
            console.log(username)
            console.log(password)

            try {
                if(!username || !password){
                    throw new Error("Missing Credential");
                }
                const db = await User.findOne({Username:username})
                if(!db){
                    done(null,null)
                    throw new Error("User Not Found");
                }
                const isValid = ComparePasswords.ComparePasswords(
                    password,
                    db.Password
                )
                if(isValid){
                    console.log("Authenticated")
                    done(null,db)
                } else {
                    console.log("Failed to Authenticate")
                    done(null,null)
                }
            } catch (error) {
                done(error, null);
            }
        }
    )
)