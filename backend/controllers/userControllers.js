const User = require("../Models/userModel");
const {jwtDecode} = require('jwt-decode')
const asyncHandler = require('express-async-handler')

const authUser = asyncHandler(async (req, res) => {
    
    const { token } = req.body;

  try {
    const decodedToken = jwtDecode(token);
    
    const { name, email, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, picture, token });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send('Token verification failed');
  }
    
})

const gettAllUsers = asyncHandler(async(req, res) => {

  
  const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ]
  } : {}

  const users = await User.find(keyword).find({email: {$ne: req.email}})
  res.send(users)

})


module.exports = {authUser, gettAllUsers}