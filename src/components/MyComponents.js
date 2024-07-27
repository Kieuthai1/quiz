//class component
// function component

import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserinfor";

// class MyComponents extends React.Component{
 


//     state = {
//         listUser: [
//             {id: 1, name: "Hoi dan it", age: "15"},
//             {id: 2, name: "Hoi dan it2", age: "33"},
//             {id: 1, name: "Hoi dan it3", age: "35"},

//         ]
        
//     }


//     handledAddNewUser = (userObj) => {
//         console.log(">>> check date from  parent", userObj)
//         this.setState({
//             listUser: [userObj,...this.state.listUser ]
//         })
//     }

//     handleDeleteUser = (UserId) => {
//         let listUsersClone = this.state.listUser;
//         listUsersClone = listUsersClone.filter(item => item.id !== UserId);
//         this.setState({
//             listUser: listUsersClone
//         })

//     }
//     //jsx
//     render(){
//         return(
//             <div>        
//                 <AddUserInfor
//                  handledAddNewUser={this.handledAddNewUser}
//                  />
//                 <br></br>
//                 <DisplayInfor 
//                     listUser={this.state.listUser}
//                     handleDeleteUser={this.handleDeleteUser}
//                 />

//             </div>
//         );
//     }
// }

const MyComponents = () => {

    const [listUser, setListUser] = useState([
        {id: 1, name: "Hoi dan it", age: "15"},
        {id: 2, name: "Hoi dan it2", age: "33"},
        {id: 3, name: "Hoi dan it3", age: "35"},
    ]); 

    const  handledAddNewUser = (userObj) => {
        console.log(">>> check date from  parent", userObj);
        setListUser([userObj,...listUser]);
    }

    const handleDeleteUser = (UserId) => {
        let  updateListUser = listUser.filter(item => item.id !== UserId);
        setListUser(updateListUser);

    }

    return(
    <div>        
        <AddUserInfor handledAddNewUser={handledAddNewUser}/>
        <br></br>
        <DisplayInfor listUser={listUser} handleDeleteUser={handleDeleteUser} />

    </div>
        );
    }

export default MyComponents;



