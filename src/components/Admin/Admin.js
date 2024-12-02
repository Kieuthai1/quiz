import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet,} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Admin = (props) =>{
    const[collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}/>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}> 
                        <FaBars className="leftside"/> 
                    </span>
                    <div className="rightside">
                          <Language/>
                        <NavDropdown title={t('header.setting.title0')} id="basic-nav-dropdown">         
                            <NavDropdown.Item >{t('header.setting.title3')}</NavDropdown.Item>
                            <NavDropdown.Item >{t('header.setting.title4')}</NavDropdown.Item>
                            </NavDropdown> 
                       
                    </div>
                        
                </div>
                       
                <div className="admin-main">
                <PerfectScrollbar>    
                    <Outlet/>
                </PerfectScrollbar>
                </div>
               
            </div>
                    
        </div>
    )
}
export default Admin;