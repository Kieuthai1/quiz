import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalView from "./ModelView";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) =>{
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setshowModalUpdateUser] =useState(false);
    const [showModalView, setShowModalView] =useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUsers();
    },[]);
    
    const fetchListUsers = async() => {
    let res = await getAllUsers();
    if(res.EC === 0){
        setListUsers(res.DT)
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
                    ManageUser
            </div>
            <div className="users-content">
                    <div className="btn-add-new">
                        <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}> <FcPlus/> add new user</button>
                    </div>
                    <div className="table-user-container">
                        <TableUser 
                            listUsers={listUsers}
                            handleClickBtnUpdate = {handleClickBtnUpdate}
                            handleBtnView = {handleBtnView} 
                            handleClickBtnDelete = {handleClickBtnDelete}/>
                            
                    </div>
                              <ModalCreateUser 
                              show={showModalCreateUser}
                              setShow={setShowModalCreateUser}
                              fetchListUsers ={fetchListUsers}
                               />
                              <ModalUpdateUser
                                  show={showModalUpdateUser}
                                  setShow={setshowModalUpdateUser}
                                  dataUpdate={dataUpdate}
                                  fetchListUsers ={fetchListUsers}
                                  resetUpdateData ={resetUpdateData}
                                 
                              />
                              <ModalView
                                show = {showModalView}
                                setShow = {setShowModalView}
                                dataUpdate={dataUpdate}
                                fetchListUsers ={fetchListUsers}
                              />
                              <ModalDeleteUser 
                              show={showModalDeleteUser}
                              setShow ={setShowModalDeleteUser} 
                              dataDelete ={dataDelete}
                              fetchListUsers ={fetchListUsers}

                             />
            </div>
  
        </div>
    );
}

export default ManageUser;