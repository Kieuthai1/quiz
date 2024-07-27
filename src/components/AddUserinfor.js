import React, {  useState } from "react";
// class AddUserInfor extends React.Component{
   
//     state = {
//         name: 'MEow con',
//         age:  '9'
//     };


//     handleOnChangeInput = (event) => {
//             this.setState({
//                 name: event.target.value
//             })
//     }    
//     handleOnChangeAddress = (event) => {
//         //badcode- code xau xa
//         //this.state.address = event.target.value
//         this.setState({
//             age: event.target.value
//         })
// }    
//     handleOnSubmit = (event) =>{
//         event.preventDefault();
//         console.log(this.state)
//         this.props.handledAddNewUser({
//             id: Math.floor((Math.random()*100) +1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         });
//     }
 
//     render(){
//         return(
//             <div>
//                  My name is {this.state.name} and i'm {this.state.age}
                 
//             <form onSubmit={(event) => this.handleOnSubmit(event)}>
//                 <label>Your name: </label>
//                 <input
//                 value = {this.state.name}
//                     type = "text"
//                     onChange={(event) => this.handleOnChangeInput(event)}
//                 />
//                 <label>Your age: </label>
//                 <input
//                 value = {this.state.age}
//                     type = "text"
//                     onChange={(event) => this.handleOnChangeAddress(event)}
//                 />
//                 <button>Submit</button>
//             </form>
            
//             </div>
//         )
//     }
// }

const AddUserInfor = (props) => {
    const [name, setName] = useState('Meow con');
    const [age, setAge] = useState('9');

    const handleOnChangeInput = (event) => {
        setName(event.target.value);
    };
    const handleOnChangeAge  = (event) => {
        setAge(event.target.value);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log({ name, age });
        props.handledAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: name,
            age: age,
        });
    };
 
    return(
            <div>
                 My name is {name} and i'm {age}   
            <form onSubmit={handleOnSubmit}>
                <label>Your name: </label>
                <input
                   value = {name}
                    type = "text"
                    onChange={handleOnChangeInput}
                />
                <label>Your age: </label>
                <input
                    value = {age}
                    type = "text"
                    onChange={handleOnChangeAge}
                />
                <button>Submit</button>
            </form>  
            </div>
        );
  
} ;

export default AddUserInfor;