import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers,getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalView from "./ModelView";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPage from "./TableUserPage";
import { useTranslation, Trans } from 'react-i18next';

const ManageUser = (props) =>{
    const LIMIT_USER =  3;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); 

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setshowModalUpdateUser] =useState(false);
    const [showModalView, setShowModalView] =useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataDelete, setDataDelete] = useState({});

    const { t } = useTranslation();

    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    },[]);
    
    const fetchListUsers = async() => {
    let res = await getAllUsers();
    if(res.EC === 0){
        setListUsers(res.DT);
        }
    }
    const fetchListUsersWithPaginate = async(page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if(res.EC === 0){
            console.log('res.dt ', res.DT)
            setListUsers(res.DT.users);
            setPageCount (res.DT.totalPages);
            }
        }

    const handleClickBtnUpdate = (user) =>{
        setshowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleBtnView = (user) => {
        setShowModalView(true); 
        setDataUpdate(user);
    }
    const resetUpdateData =() =>{
        setDataUpdate({});
    }
    const handleClickBtnDelete = (user) =>{
        setShowModalDeleteUser(true);
        setDataDelete(user);
       }

    return(
        <div className="manage-user-container">
            <div className="title">
            {t('amdin.ManageUser.title0')}
            </div>
            <div className="users-content">
                    <div className="btn-add-new">
                        <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}> <FcPlus/>{t('amdin.ManageUser.title1')}</button>
                    </div>
                    <div className="table-user-container">
                        {/* <TableUser 
                            listUsers={listUsers}
                            handleClickBtnUpdate = {handleClickBtnUpdate}
                            handleBtnView = {handleBtnView} 
                            handleClickBtnDelete = {handleClickBtnDelete}/> */}
                            
                    </div>
                                <TableUserPage
                                listUsers={listUsers}
                                handleClickBtnUpdate = {handleClickBtnUpdate}
                                handleBtnView = {handleBtnView} 
                                handleClickBtnDelete = {handleClickBtnDelete}
                                fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                                pageCount={pageCount}
                                currentPage ={currentPage}
                                setCurrentPage = {setCurrentPage}
                                />
                              <ModalCreateUser 
                              show={showModalCreateUser}
                              setShow={setShowModalCreateUser}
                              fetchListUsers ={fetchListUsers}
                              fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                              currentPage ={currentPage}
                              setCurrentPage = {setCurrentPage}
                               />
                              <ModalUpdateUser
                                  show={showModalUpdateUser}
                                  setShow={setshowModalUpdateUser}
                                  dataUpdate={dataUpdate}
                                  fetchListUsers ={fetchListUsers}
                                  resetUpdateData ={resetUpdateData}
                                  fetchListUsersWithPaginate ={fetchListUsersWithPaginate}          
                                  currentPage ={currentPage}
                                  setCurrentPage = {setCurrentPage}                   
                              />
                              <ModalView
                                show = {showModalView}
                                setShow = {setShowModalView}
                                dataUpdate={dataUpdate}
                                fetchListUsers ={fetchListUsers}
                                fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                                currentPage ={currentPage}
                                setCurrentPage = {setCurrentPage}
                              />
                              <ModalDeleteUser 
                              show={showModalDeleteUser}
                              setShow ={setShowModalDeleteUser} 
                              dataDelete ={dataDelete}
                              fetchListUsers ={fetchListUsers}
                              fetchListUsersWithPaginate ={fetchListUsersWithPaginate}
                              currentPage ={currentPage}
                              setCurrentPage = {setCurrentPage}

                             />
            </div>
  
        </div>
    );
}

export default ManageUser;