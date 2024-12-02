import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import { FaReact } from "react-icons/fa";

const Header = () =>  {
  const isAuthenticated =useSelector(state => state.user.isAuthenticated);
  const account =useSelector(state => state.user.account);
  const  dispatch = useDispatch()
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = ()=>{
    navigate('/login');
  }
  const handleRegiter = ()=>{
    navigate('/regiter');
  }
  
  const handleLogOut = async() =>{
    let rs = await logout(account.email ,account.refresh_token);
   
    if(rs && rs.EC === 0){
      // clear data redux
      dispatch(doLogout())
      navigate('/')
    }
    else{
      toast.error(rs.EM);
    }
  
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <FaReact className='react-icon' />
        {/* <Navbar.Brand href="#home">Trang chủ</Navbar.Brand> */}
        <NavLink to= '/' className='navbar-brand'>{t('header.title1')}</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to= '/' className='nav-link'>{t('header.title2')}</NavLink>
            <NavLink to= '/users' className='nav-link'>{t('header.title3')}</NavLink>
            <NavLink to= '/admin' className='nav-link'>{t('header.title4')}</NavLink>

            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">User</Nav.Link>
            <Nav.Link href="/Admin">Admin</Nav.Link>            */}
          </Nav>
          <Nav>
            {isAuthenticated === false ?
            <>        
                <button className='btn-login' onClick={() => handleLogin()} >{t('header.setting.title1')}</button>
              <button className='btn-signup' onClick={() => handleRegiter()}>{t('header.setting.title2')}</button>
            </>
            :
                <NavDropdown title={t('header.setting.title0')} id="basic-nav-dropdown">
                    <NavDropdown.Item >{t('header.setting.title3')}</NavDropdown.Item>
                   <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.setting.title4')}</NavDropdown.Item>
                </NavDropdown> 
    }
            <Language/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;