import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postRegiter } from '../../services/apiService';
import {  toast } from 'react-toastify';

import { VscEye, VscEyeClosed } from "react-icons/vsc";
const Regiter = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();


    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleRegiter = async() =>{
               //validate
               const isValidEmail = validateEmail(email);
               if(!isValidEmail){
                 toast.error('Invalid email')
                   return;          
               }
               if(!password){
                 toast.error('invalid password')
                   return;
               }
       
        // submit apis
        let data = await postRegiter(email, password, username);
        if(data && data.EC === 0){
            console.log("check date", data)
            toast.success(data.EM);
            navigate("/login");
          }
          if(data && +data.EC !== 0){
            toast.error(data.EM);
          }
    }
    return(
        <div className="login-container">
           <div className='header'>
                 <span>Already have an account ?</span> 
                 <button onClick={() => navigate('/login')}>Log in</button>
           </div>
           <div className='title col-4 mx-auto'>
                KIUETHAI
            </div>
            <div className='welcome col-4 mx-auto'>
            Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                        <label>Email (*)</label>
                        <input 
                        type={'email'} 
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group pass-group'>
                        <label>Password (*)</label>
                        <input
                        type={isShowPassword ? 'text' : "password"} 
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        />
                        {
                          isShowPassword ? 
                            <span className='icons-eye'
                            onClick={() => setIsShowPassword(false)}>
                                  <VscEye />
                            </span>
                            :
                            <span className='icons-eye'
                            onClick={() => setIsShowPassword(true)}>
                              <VscEyeClosed /> 

                            </span>
                        }
                    </div>
                    <div className='form-group'>
                        <label>Username</label>
                        <input
                        type={'username'} 
                        className='form-control'
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div>
                        <button
                        className='btn-submit' 
                        onClick={() => handleRegiter()}
                        >Sign up to KIUETHAI
                        </button>
                      </div>
                      <div className='text-center'>
                        <span className='back' onClick={() => {navigate('/')}}>
                          &#60;&#60;   Go To Home
                        </span>
                    </div>
                    
            </div>
        </div>
    )
}
export default Regiter;