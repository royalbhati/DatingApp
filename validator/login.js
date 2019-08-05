const validator = require('validator')
const isEmpty = require('./isEmpty')
module.exports = function validateLoginInput(data){
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';




    if(validator.isEmpty(data.email)){
        errors.email="Email required"
    }
    if(validator.isEmpty(data.password)){
        errors.password="password required"
    }

    if(!validator.isEmail(data.email)){
       errors.email = 'Email not valid'
    }

    //  if(!validator.equals(data.password,data.password2)){
    //      errors.passwords="Passwords must match"
    //  }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}