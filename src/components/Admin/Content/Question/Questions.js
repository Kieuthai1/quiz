import { useState } from 'react';
import Select from 'react-select';
import  './Questions.scss';
import { FiPlusSquare } from "react-icons/fi";
import { AiFillMinusSquare } from "react-icons/ai";


const Questions = (props) =>{
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    const [selectdQuiz, setSelectdQuiz] = useState({});
    return(
        <div className="question-container">
            <div className="title">
                Manage Questions     
            </div>    
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz: </label>
                    <Select
                                defaultValue={selectdQuiz}
                                onChange={setSelectdQuiz}
                                options={options}                          
                    />
                </div>
               
                <div className='mt-3'>
                    Add question:
                </div>
            <div>                                 
                <div className='questions-content'>                    
                    <div className="form-floating description">
                        <input type="type" className="form-control"  placeholder="name@example.com"/>
                        <label>Description</label>
                    </div>
                    <div className='group-upload'>
                        <label className='label-up'>Upload Image</label>
                        <input type={'file'} hidden/>
                        <span>0 file is uploaded</span>
                    </div>
                    <div className='btn-add'>
                        <span>
                          <FiPlusSquare  className='icon-add'/>
                        </span>
                        <span>
                          <AiFillMinusSquare className='icon-remove' />
                        </span>
                    </div>

                </div>
                <div className='answer-content'>
                    <input 
                        className="form-check-input isconrrect"
                        type="checkbox" 
                    />
                    <div className="form-floating anwser-name">
                        <input type="type" className="form-control"  placeholder="name@example.com"/>
                        <label>Answer 1</label>
                    </div>
                    <div className='btn-group'>
                        <span>
                          <FiPlusSquare  className='icon-add'/>
                        </span>
                        <span>
                          <AiFillMinusSquare className='icon-remove' />
                        </span>
                    </div>
                </div>
            </div>   
            </div>
        </div>
    )
}
export default Questions;