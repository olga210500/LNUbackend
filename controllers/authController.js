import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import validator from "express-validator";
import ApiError from "../exception/apiError.js";
import jwt from "jsonwebtoken";
import KEY from "../config.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import authorizationService from "../services/authorizationService.js";
//для отримання даних по умові


//  const register = async (req, res, next) => {
//   try {
//     const {email,password} = req.body;
//     const userData = await authorizationService.registerUser(email,password)
//     res.cookie('refreshToken', userData.refreshToken,{maxAge:30*24*360000 ,httpOnly:true})

//     return res.json(userData)

    // const errors = validator.validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ message: "Registration error", errors });
    // }
    // // const { email, password } = req.body;
    // const candidate = await User.findOne({ email });
    // if (candidate) {
    //   res.status(400).json({ message: "User with this email already exist" });
    // }
    // const hashPassword = bcrypt.hashSync(password, 8);
    // const userRole = await Role.findOne({ value: "USER" });
    // const user = new User({
    //   email,
    //   password: hashPassword,
    //   roles: [userRole.value],
    // });
    // user.save();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Registration error" });
//   }
// };
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userData = await authorizationService.login(email,password)
//     res.cookie('refreshToken', userData.refreshToken,{maxAge:30*24*360000 ,httpOnly:true})

//     return res.json(userData)
//   } catch (error) {
    
  // }
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(400).json({ message: `User ${user} doesn't exist` });
//     }

//     if (user.status != "Active") {
//       return res.status(401).send({
//         message: "Pending Account. Please Verify Your Email!",
//       });
//     }
//     const validPassword = bcrypt.compareSync(password, user.password);
//     if (!validPassword) {
//       res.status(400).json({ message: `Wrong password` });
//     }
//     const token = generateAccessToken(user._id, user.roles);
//     return res.json({ token });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Login error" });
//   }
// };
// }
// const logout = async (req,res)=>{
//   try {
//     const {refreshToken}  = req.cookies;
//     const token = await authorizationService.logout(refreshToken);
//     res.clearCookie('refreshToken');
//     return res.json(token);
//   } catch (error) {
//     console.log(error);
//   }
// }
// const activate = async (req,res)=>{
//   try {
//     const activationLink = req.params.link;
//     await authorizationService.activate(activationLink);
//     return res.redirect(process.env.CLIENT_URL)
//   } catch (error) {
//     console.log(error)
//   }
// }
// const refresh = async (req,res)=>{
//   try {
    
//   } catch (error) {
    
//   }
// }
const register = async(req, res, next)=> {
  try {
      const errors = validator.validationResult(req);
      // if (!errors.isEmpty()) {
      //   console.log(errors);
      //     return next(ApiError.BadRequest('Validation error', errors.array()))
      // }
      const {email, password,firstName,lastName} = req.body;
      const userData = await authorizationService.register(email, password,firstName,lastName);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
  } catch (e) {
      next(e);
  }
}

const login=async(req, res, next)=> {
  try {
      const {email, password} = req.body;
      const userData = await authorizationService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
  } catch (e) {
      next(e);
  }
}

const logout=async(req, res, next)=> {
  try {
      const {refreshToken} = req.cookies;
      const token = await authorizationService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
  } catch (e) {
      next(e);
  }
}

const activate=async(req, res, next)=> {
  try {
      const activationLink = req.params.link;
      await authorizationService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
      next(e);
  }
}

const refresh=async(req, res, next)=> {
  try {
      const {refreshToken} = req.cookies;
      const userData = await authorizationService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
  } catch (e) {
      next(e);
  }
}

export { register, login, logout,activate,refresh };
