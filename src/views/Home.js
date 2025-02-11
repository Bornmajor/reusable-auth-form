import React from 'react';
import logo from '../assets/images/logo.png'
import GoogleBtn from '../components/GoogleBtn';
import FormComponent from '../components/FormComponent';
import { message } from "antd";

const Home = () => {

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
    
    
      const signInUser = async (email, pwd) => {
        return new Promise(async (resolve, reject) => {

             //modify this code
            try {
                const response = await fetch("https://your-api.com/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password: pwd }),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    successFeedback(result.message || "Successfully logged in");
                    resolve(true);
                } else {
                    errorFeedback(result.message || "Login failed");
                    resolve(false);
                }
            } catch (error) {
                errorFeedback("An error occurred. Please try again.");
               // reject(error);
                resolve(true);
            }

        });
    };
    
    

    const signUpUser = async (email, pwd) => {
        return new Promise(async (resolve, reject) => {

            //modify this code
            try {
                const response = await fetch("https://your-api.com/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password: pwd }),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    successFeedback(result.message || "Successfully created an account");
                    resolve(true);
                } else {
                    errorFeedback(result.message || "Signup failed");
                    resolve(false);
                }
            } catch (error) {
                errorFeedback("An error occurred. Please try again.");
                //reject(error);
                resolve(true);
            }
        });
    };

    return (
        <>
        {contextHolder}
      <div className='d-flex align-items-center justify-content-center' style={{height:'100vh'}}>
        <FormComponent logo={logo} brand="My brand" GoogleBtn={ <GoogleBtn />} signInUser={signInUser} signUpUser={signUpUser} /> 
      </div>
        </>
      
    
    );
}

export default Home;
