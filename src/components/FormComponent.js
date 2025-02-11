import React, { useState } from 'react';
import { Button, Image } from 'antd';
import {Input} from 'antd';
import { Divider } from 'antd';
import { useLocation } from 'react-router';
import validator from 'validator'; //validate email
import { message } from "antd";




const FormComponent = ({logo,brand,GoogleBtn,signInUser,signUpUser}) => {
const [email,setEmail] = useState('');
const [pwd,setPwd] = useState('');
const [formIsLoading,setFormIsLoading] = useState(false);
const [authType,setAuthType] = useState('signin');

const [emailError,setEmailError] = useState(false);
const [pwdError,setPwdError] = useState(false);

const [emailErrorText,setEmailErrorText] = useState('');
const [pwdErrorText,setPwdErrorText] = useState('');

const [messageApi, contextHolder] = message.useMessage();

const successFeedback = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const errorFeedback = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };


const resetAllValidationMessages = () =>{
    setEmailError(false);
    setPwdError(false);

    setEmailErrorText('');
    setPwdErrorText('');
}


// Define regex patterns for each condition
const hasUppercase = /[A-Z]/.test(pwd); // At least one uppercase letter
const hasLowercase = /[a-z]/.test(pwd); // At least one lowercase letter
const hasNumber = /[0-9]/.test(pwd); // At least one number
const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd); // At least one special character



const validateForm = async() =>{
try{

//unlock submit btn loading
setFormIsLoading(true);

//check if email
if(email === '' || email.trim() === ' '){

// Validate email
setEmailError(true)
setEmailErrorText('Email required');
setFormIsLoading(false);     
return false;

}

//check if password
if(pwd === '' || pwd.trim() === ' '){
// Validate pwd
setPwdError(true)
setPwdErrorText('Password required');
setFormIsLoading(false);     
return false;

}

if(!validator.isEmail(email)){
// Validate email
setEmailError(true)
setEmailErrorText('Email address invalid');
setFormIsLoading(false);     
return false;


}

//registration process
if(authType == 'signup' ){
//tries to register a user
if(pwd.length < 8){
//check password length
setPwdError(true)
setPwdErrorText('Password too short try atleast 8 characters');
//enable submit btn
setFormIsLoading(false);  
return false;
}


if(!hasUppercase){
 //check password length
 setPwdError(true)
 setPwdErrorText('Password should at least have an uppercase letter');
//enable submit btn
setFormIsLoading(false);  
return false;   
}



if(!hasLowercase){
//check password length
setPwdError(true)
setPwdErrorText('Password should at least have a lowercase letter');
//enable submit btn
setFormIsLoading(false);  
return false;   
}


if(!hasNumber){
//check password length
setPwdError(true)
setPwdErrorText('Password should at least have a number');
//enable submit btn
setFormIsLoading(false);  
return false;   
}

if(!hasSpecialChar){
//check password length
setPwdError(true)
setPwdErrorText('Password should at least have a special character');
//enable submit btn
setFormIsLoading(false);  
return false;   
}

resetAllValidationMessages();

const response = await signUpUser(email,pwd);

if(response){
//unlock submit btn
setFormIsLoading(false);     
}

 
//login process
}else{

resetAllValidationMessages();    

const response = await signInUser(email,pwd);

if(response){
//unlock submit btn
setFormIsLoading(false);     
}

}




}catch(error){
console.log(error);
}
}

return (
<div className='form-container'>
    {contextHolder}

<div className='d-flex align-items-center'>
<Image
src={logo}
width='80px'
preview={false}
/>

<p className='bold' >{brand}</p>

</div>


<div className=''>

<div className='my-2'>
<label className='bold my-1'>Email address</label>
<Input
placeholder='xyz@gmail.com'
status={emailError && 'error'}
onChange={(e) => 
{
resetAllValidationMessages();    
setEmail(e.target.value)    
}    

}
/>    
<label className='error-label'>{emailErrorText}</label>

</div>

<div className='my-2'>
<label className='bold my-1'>Password</label>
<Input.Password
 placeholder='********'
status={pwdError && 'error'}
onChange={(e) =>
{
resetAllValidationMessages();      
setPwd(e.target.value)    
}
}
/> 
<label className='error-label'>{pwdErrorText}</label>

{authType == 'signin' &&
   <p><a className='my-1 app-link'> Forgot password ?  </a></p> 
}

</div>

<div className='my-3'>
<Button
loading={formIsLoading}
type='primary'
className='w-100'
onClick={() => validateForm()}
>
{authType == 'signin' ?
'SIGN IN'
:
'SIGN UP'
}

</Button>
</div>

<div className='my-3'>
{authType == 'signin' ?
<p className='text-center'>Don't have an account <a className='app-link'
 onClick={() => setAuthType('signup')}
>
Sign Up
</a>
</p>
:
<p className='text-center'>Already have an account <a className='app-link'  onClick={() => setAuthType('signin')}>Sign In</a></p>
}

</div>

<Divider plain>Or continue with</Divider>

<div className='my-2 d-flex justify-content-center'>
   {GoogleBtn}
</div>



</div>



</div>
);
}

export default FormComponent;
