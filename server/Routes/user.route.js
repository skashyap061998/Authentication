const {Router} = require('express')
const {body,val} =  require('express-validator')
const { Signup, Login } = require('../Controller/user.controller')
const passport = require('../Configs/google.oauth')
const userRouter = Router()

userRouter.post('/signup',[
    body('name','Enter a valid name').isLength({min:3}),
    body('username','Enter a valid username').isLength({min:3}),
    body('email','Enter a Valid email').isEmail(),
    body('password',"Enter valid password").isLength({min:5})
],Signup)

userRouter.post('/login',[
    body('password',"Enter valid password").isLength({min:5})
],Login)

userRouter.get('/google',passport.authenticate('google', { scope: ['profile','email'] }))
userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login',session :false }),
async function(req, res) {
  const {name,email,password} = req.user
//   const 
//   const newUser =  new userModel(req.user);
//   await newUser.save();
//   const{email}
  res.redirect('/');
}

);

module.exports = userRouter