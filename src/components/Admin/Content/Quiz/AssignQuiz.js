import { useState, useEffect } from 'react';
import Select from 'react-select';
import  {getAllQuizForAdmin, getAllUsers} from '../../../../services/apiService';


const AssignQuiz  = (props) =>{
    const [listQuiz, setListQuiz] = useState([]);
    const [selectdQuiz, setSelectdQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [selectdUser, setSelectdUser] = useState({});

    useEffect(() =>{
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async() =>{
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0){
            let newQuiz = res.DT.map(item => {
                return{
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
      
    }
    const fetchUser = async() =>{
        let res = await getAllUsers();
        if(res && res.EC === 0){
            let users = res.DT.map(item => {
                return{
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
      
    }


    return(
        <div className="assign-quiz-container row">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                                defaultValue={selectdQuiz}
                                onChange={setSelectdQuiz}
                                options={listQuiz}                          
                    />
                </div>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select User: </label>
                    <Select
                                defaultValue={selectdUser}
                                onChange={setSelectdUser}
                                options={listUser}                          
                    />
                </div>
                <div>
                    <button className='btn btn-warning mt-3'>Assign</button>
                </div>
        </div>
    )
}
export default AssignQuiz;