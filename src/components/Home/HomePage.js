import videoHomepage from '../../assets/video-homepage.mp4';
import icon from '../../assets/check-icon.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
    const isAuthenticated =useSelector(state => state.user.isAuthenticated);
    const navigite = useNavigate();
    const { t } = useTranslation();

    return(
        <div className="homepage-container">
           <video  autoPlay muted loop>
            <source 
                src={videoHomepage} 
                type="video/mp4"
            />
           </video>
           <div className='homepage-content'>
                <div className='title-1'> 
                 {/* TẠO BÀI THI TRẮC NGHIỆM ONLINE MIỄN PHÍ VÀ DỄ SỬ DỤNG */}
                    {t('homepage.title1')}
                </div>
                <div className='title-2'>
                        <div> <img src={icon}></img>  {t('homepage.title2')}</div>
                        <div>  <img src={icon}></img>  {t('homepage.title3')}</div>
                        <div> <img src={icon}></img>  {t('homepage.title4')}</div>    
               </div>
                <div  className='title-3'>
                    {isAuthenticated === false ?
                         <button onClick={() => navigite('/login')}>{t('homepage.title5')}</button>
                         :
                         <button onClick={() => navigite('/users')}>{t('homepage.title6')}</button>
                        }               
                </div>
           </div>
        </div>
    )
}
export default HomePage;