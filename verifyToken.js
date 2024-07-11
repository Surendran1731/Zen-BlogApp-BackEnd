// const jwt=require('jsonwebtoken')

// const verifyToken=(req,res,next)=>{
//     const token=req.cookies.token
//     // console.log(token)
//     if(!token){
//         return res.status(401).json("You are not authenticated!")
//     }
//     jwt.verify(token,process.env.SECRET,async (err,data)=>{
//         if(err){
//             return res.status(403).json("Token is not valid!")
//         }
        
//         req.userId=data._id
       
//         // console.log("passed")
        
//         next()
//     })
// }

// module.exports=verifyToken


const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = function(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Access denied. No JWT provided.');
  }

  try {
    const decoded = jwt.verify(token, config.get(process.env.SECRET));
    res.set('Authorization', token);
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).send('Invalid JWT.');
  }
};

module.exports=verifyToken