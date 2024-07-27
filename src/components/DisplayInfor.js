import React, {useEffect, useState } from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg';


//stateless vs stateful 
// class DisplayInfor extends React.Component{  


   
//     render(){
//         // destructuring array/object
//         const {listUser} = this.props; //object
      
//         // const listUser = this.props.listUser;
//         //props => viết tắt properties
//         return(
//             <div className="display-infor-container">
             
                
//                 {true &&  
//                 <div>
//                     {listUser.map((user, index) => { 
//                             return(

//                                 <>
//                                  <div key={user.id} className={+user.age >18 ? "green" : "red"}>
//                                     <div>  My name {user.name}</div> 
//                                     <div>my age's {user.age}</div> 
                                 
//                                 </div>
//                                 <div>
//                                     <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     <hr/>
//                                 </div>
//                                 </>
                               

//                         )               
//                     })}
        

//                 </div>
//     }
//             </div>
//         );
//     }
// }
const DisplayInfor = (props) => {

    const {listUser} = props; //object

    const [isShowHideListUser, setShowHideListUser] =  useState (true);

    // this.state ={
    //     isShowHideListUser: true
    // }

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser);
    }
    useEffect(
        () => {
            if(listUser.length === 0){
                alert('you deleted all the user')
            }
            console.log(">>  call me effect")
        },[listUser]
    );

                return(
                    <div className="display-infor-container"> 
                        <div>
                            <span onClick = {() => handleShowHideListUser()}> 
                                {isShowHideListUser ===true? "Hide list user" : "Show list user"}
                               
                            </span>

                        </div>
                        
                        {isShowHideListUser &&  
                        <div>
                            {listUser.map((user, index) => { 
                                    return(
        
                                        <>
                                         <div key={user.id} className={+user.age >18 ? "green" : "red"}>
                                            <div>  My name {user.name}</div> 
                                            <div>my age's {user.age}</div> 
                                         
                                        </div>
                                        <div>
                                            <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                            <hr/>
                                        </div>
                                        </>
                                       
        
                                )               
                            })}
                
        
                        </div>
            }
                    </div>
                );
}

export default DisplayInfor;