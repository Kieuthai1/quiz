import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import {  toast } from 'react-toastify';
import Regiter from './Regiter';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner3 } from "react-icons/im";
import Language from '../Header/Language';
import { useTranslation, Trans } from 'react-i18next';


const Login = (props) =>{
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();


    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleLogin = async() =>{
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
        setIsLoading(true);
        // submit apis
        let data = await postLogin(email, password);
        if(data && data.EC === 0){
          dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false);
            navigate("/");
           }
          if(data && +data.EC !== 0){
            toast.error(data.EM);
            setIsLoading(false);

          }
    }
    const handlekeyDown = (event) =>{
      console.log('event key', event.key)
      if(event && event.key === 'Enter'){
        handleLogin();
      }
    }
    return(
        <div className="login-container">
           <div className='header'>
                 <span>{t('login.header1')}</span> 
                 <button onClick={() => navigate('/regiter')}>{t('login.header2')}</button>
                 <Language/>
           </div>
           <div className='title col-4 mx-auto'>
                KIUETHAI
            </div>
            <div className='welcome col-4 mx-auto'>
            {t('login.title3')}
            </div>
            <div className='content-form col-4 mx-auto'>
                    <div className='form-group'>
                        <label>{t('login.title4')}</label>
                        <input 
                        type={'email'} 
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>{t('login.title5')}</label>
                        <input
                        type={'password'} 
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlekeyDown(event)}
                        />
                    </div>
                    <span>{t('login.title6')}</span>
                    <div>
                        <button
                        className='btn-submit' 
                        onClick={() => handleLogin()}
                        disabled = {isLoading}
                        >
                  {isLoading === true && <ImSpinner3 className='loaderIcon' />}        
                          <span>{t('login.title7')}</span>
                        </button>
                      </div>
                      <div className='text-center'>
                        <span className='back' onClick={() => {navigate('/')}}>
                          &#60;&#60;  {t('login.title8')}
                        </span>
                    </div>
                    
            </div>
        </div>
    )
}
export default Login;