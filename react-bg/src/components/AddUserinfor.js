import React from "react";

class AddUserInfor extends React.Component{
   
    state = {
        name: 'MEow con',
        age:  '9'
    };


    handleOnChangeInput = (event) => {
            this.setState({
                name: event.target.value
            })
    }    
    handleOnChangeAddress = (event) => {
        //badcode- code xau xa
        //this.state.address = event.target.value
        this.setState({
            age: event.target.value
        })
}    
    handleOnSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state)
        this.props.handledAddNewUser({
            id: Math.floor((Math.random()*100) +1) + '-random',
            name: this.state.name,
            age: this.state.age
        });
    }
   
    render(){
        return(
            <div>
                 My name is {this.state.name} and i'm {this.state.age}
            <form onSubmit={(event) => this.handleOnSubmit(event)}>
                <label>Your name: </label>
                <input
                value = {this.state.name}
                    type = "text"
                    onChange={(event) => this.handleOnChangeInput(event)}
                />
                <label>Your age: </label>
                <input
                value = {this.state.age}
                    type = "text"
                    onChange={(event) => this.handleOnChangeAddress(event)}
                />
                <button>Submit</button>
            </form></div>
        )
    }
}
export default AddUserInfor;