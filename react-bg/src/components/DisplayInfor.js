import React from "react";

class DisplayInfor extends React.Component{  

    state ={
        isShowListUser: true
    }

    handleShowHide = () => {
     this.setState({
        isShowListUser: !this.state.isShowListUser
     })
    }
  
  
    render(){
        // destructuring array/object
        const {listUser} = this.props; //object
      
        // const listUser = this.props.listUser;
        //props => viết tắt properties
        return(
            <div>
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser === true ? "Hide list users" :  "show list users"}
                        </span>
                </div>
                {this.state.isShowListUser &&  
                <div>
                    {listUser.map((user, index) => { 
                            return(
                                <div key={user.id} className={+user.age >18 ? "green" : "red"}>
                                    <div>  My name {user.name}</div> 
                                    <div>my age's {user.age}</div> 
                                    <hr/>
                                </div>

                        )               
                    })}
        

                </div>
    }
            </div>
        );
    }
}
export default DisplayInfor;