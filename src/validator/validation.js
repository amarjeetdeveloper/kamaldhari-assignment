
const isValid = (value) => {
    if(typeof value === "undefined" || typeof value === "null") return true;
    if(typeof value === "string" && value.trim().length == 0) return true;
    return false; 
  }


  // /STRING VALIDATION BY REJEX
const isValidString = (string) => {
    return  /^[a-zA-Z]/.test(string.trim());
  };  


const isValidBody = (reqBody) => {
  return Object.keys(reqBody).length == 0;
}

  const isValidPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone)
  };

  //EMAIL VALIDATION BY REJEX
  const isValidEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.trim());
  };

  //PASSWORD VALIDATION BY REJEX
  const isValidPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password.trim());
  };
  

  
  module.exports={isValid, isValidBody,isValidString,isValidPhone,isValidEmail,isValidPassword}