const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const validate = require("../validator/validation")


// create superadmin
const CMS_createSuperAdmin = async (req,res) =>{
    try{
  let data=req.body
   
    if(validate.isValidBody(data)){
      return res.status(400).send({ status: false, message: "Oops you forgot to enter details" });
  }  
   
  //checking for name
  if(!data.name){
      return res.status(400).send({ status: false, message: "First name is required" }); 
  }

    if(validate.isValidString(data.name)){
      return res.status(400).send({ status: false, message: "Invalid format of first name" }) }
  
   //checking for email
   if(!data.email){
      return res.status(400).send({ status: false, message: "Email is required" }); 
  }
  if (!validate.isValidEmail(data.email)) {
      return res.status(400).send({ status: false, message: "Invalid Email format", });
    }

  //checking for phone

   if (!data.phone) {
    return res.status(400).send({ status: false, message: "Phone Number is required" });
  } 
  
  if (!validate.isValidPhone(data.phone)) {
      return res.status(400).send({ status: false, message: "Invalid Phone number", });
    }

    if(!data.role){
      return res.status(400).send({status:false, message:"please provide role"})
    }

  //checking for password 
  if(!data.password){
      return res.status(400).send({ status: false, message: "Password is required" }); 
  }
  if(!validate.isValidPassword(data.password)){
      return res.status(400).send({ status: false, message: "Password should contain at-least one number,one special character and one capital letter with length in between 8-15", })
  }
   
  let saveData = await userModel.create(data);
      res.status(201).send({ status: true, message: "User created successfully", data: saveData })
  }

       catch (err) {
      res.status(500).send({ status: false, error: err.message })
    }  
  }
   

  // login superadmin
  const CMS_loginSuperAdmin=async (req,res)=>{
    try{
    let data=req.body
  
    if(validate.isValidBody(data)){
      return res.status(400).send({ status: false, message: "Oops you forgot to enter details" });
  }  
  if(!data.email){
    return res.status(400).send({ sataus: false, message: "Email is required" });
  }
  if (!validate.isValidEmail(data.email)) {
    return res.status(400).send({ status: false, message: "Invalid Email format", });
  }
  let findUser = await userModel.findOne({ email:data.email })
      if (!findUser) return res.status(404).send({ status: false, message: "User is not found" })
  
      // password checking
      if(!data.password){
        return res.status(400).send({ status: false, message: "Password is required" }); 
    }

    if(!validate.isValidPassword(data.password)){
      return res.status(400).send({ status: false, message: "Password should contain at-least one number,one special character and one capital letter with length in between 8-15", })
  }
    
  let token = jwt.sign(
        { userId: findUser._id },
        "superAdmin", { expiresIn: '24h' }  //secreatkey
      );
  
      res.status(200).send({ status: true, message: "superadmin login successfully", data: { userId: findUser._id, token: token } })

    }catch (err) {
      res.status(500).send({ status: false, error: err.message })
    }
  }
  
  
  // change userrole
const CMS_changeRoleUser = async() => {

      try{

      let userId=req.params.userId
      
      if(!validate.isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: "UserId is Not Valid" });
      }

      const findUser = await userModel.findById({ _id: userId})
    
      if(!findUser){
        return res.status(404).send({ status: false, message: "User not found" });
      }
      if (!req.body.name  && !req.body.email && !req.body.phone && !req.body.password && !req.body.role ) {
        return res.status(400).send({ status: false, message: "Please Provide data to update" })
      }
    
    
    let updateUser = await userModel.findOneAndUpdate(
      {_id: userId}, req.body,{status:active, new: true})
    
       return res.status(200).send({ status: true, message:" updated user role", data: updateUser })
     
    }
     catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
    }; 
    
module.exports = { CMS_createSuperAdmin, CMS_loginSuperAdmin, CMS_changeRoleUser }