const express = require('express');
const router = express.Router();
const {CMS_createSuperAdmin,CMS_loginSuperAdmin,CMS_changeRoleUser} = require('../controllers/superAdminController')

const {CMS_createAdmin, CMS_loginAdmin} = require("../controllers/adminController")

const {CMS_createUser, CMS_loginUser} = require("../controllers/userController")

const{ authentication ,authorization}= require('../middlewares/auth');


//FEATURE I - Superadmin Apis

router.post('/register',CMS_createSuperAdmin)

router.post('/login',CMS_loginSuperAdmin)

router.put('/user/:userId',authentication, CMS_changeRoleUser)


//FEATURE II - admin api

router.post('/registeradmin', authentication, CMS_createAdmin)

router.post('/loginadmin',authentication, CMS_loginAdmin)


//FEATURE III - user api
router.post('/registeruser',authentication, CMS_createUser)

router.post('/loginuser',authentication, CMS_loginUser)


// if incorrect url

router.post("*", (req,res) =>{

    return res.status(404).send({ message:"Page Not Found"})
})

router.put("*", (req,res) =>{
    return res.status(404).send({ message:"Page Not Found"})
})


module.exports = router;