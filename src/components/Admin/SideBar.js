import 'react-pro-sidebar/dist/css/styles.css';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.scss';
import { useTranslation, Trans } from 'react-i18next';

const SideBar = (props) =>{
    const navigate = useNavigate();
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const { t } = useTranslation();

    return(
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >   
                     <DiReact size={'3em'} color={"00bfff"} />    
                       <span onClick={() => navigate('/')}>{t('amdin.sidebar.title0')}</span> 
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                             icon={<MdDashboard />}
                        >
                           {t('amdin.sidebar.title1')}
                            <Link to="/Admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title= {t('amdin.sidebar.title3')} 
                        >
                            <MenuItem>
                                {t('amdin.sidebar.title4')} 
                                <Link to="/admin/manage-users"/>
                            </MenuItem>
                            <MenuItem > 
                                  {t('amdin.sidebar.title5')}
                                  <Link to="/admin/manage-quizzes"/>
                            </MenuItem>
                             
                            <MenuItem> 
                                {t('amdin.sidebar.title6')}
                                <Link to="/admin/manage-questions"/>
                            </MenuItem>
                        </SubMenu>  

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                      
                     
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar;