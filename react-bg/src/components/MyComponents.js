//class component
// function component

import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserinfor";

class MyComponents extends React.Component{
 


    state = {
        listUser: [
            {id: 1, name: "Hoi dan it", age: "15"},
            {id: 2, name: "Hoi dan it2", age: "33"},
            {id: 1, name: "Hoi dan it3", age: "35"},

        ]
        
    }


    handledAddNewUser = (userObj) => {
        console.log(">>> check date from  parent", userObj)
        this.setState({
            listUser: [userObj,...this.state.listUser ]
        })
    }
    //jsx
    render(){
        return(
            <div>        
                <AddUserInfor
                 handledAddNewUser={this.handledAddNewUser}
                 />
                <br></br>
                <DisplayInfor 
                    listUser={this.state.listUser}
                />

            </div>
        );
    }
}
export default MyComponents;