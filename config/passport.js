const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = mongoose.model('User')
const keys=require('./keys')
const passport = require('passport')
const opts= {}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const passportt = passport.use( new JwtStrategy(opts,(jwt_payload,done)=>{
    // console.log(jwt_payload);
    User.findById(jwt_payload.id)
        .then(user=>{
            if(user){
                //user is sent to user route via req.user
                return done(null,user);
            }
            return done(null,false)
        })
        .catch(err=>console.log(err))

}));

module.exports = passportt