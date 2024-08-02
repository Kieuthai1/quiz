import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";

const ManageUser = (props)=>{
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        fetchListUsers();
    },[]);
    
    const fetchListUsers = async() => {
    let res = await getAllUsers();
    console.log('>> check' ,res);
    if(res.EC === 0){
        setListUsers(res.DT)
        }
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
                        <TableUser listUsers={listUsers}/>
                    </div>
                              <ModalCreateUser 
                              show={showModalCreateUser}
                              setShow={setShowModalCreateUser}
                              fetchListUsers ={fetchListUsers}
                              />
            </div>
  
        </div>
    )
}
export default ManageUser;