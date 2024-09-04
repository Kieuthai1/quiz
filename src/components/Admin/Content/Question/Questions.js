import { useState } from 'react';
import Select from 'react-select';
import  './Questions.scss';
import { FiPlusSquare } from "react-icons/fi";
import { AiFillMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) =>{
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
    const [selectdQuiz, setSelectdQuiz] = useState({});

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {   
                        id: uuidv4(),
                        description: 'answers 1',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    console.log(" >>>> question: ",questions);

    const handleAddRemoveQuestion = (type, id) =>{
        if(type === 'ADD'){
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {   
                        id: uuidv4(),
                        description: 'answers 1',
                        isCorrect: false
                    }
                ]
         };
        setQuestions([...questions, newQuestion]);
        }
        if(type === "REMOVE"){
            let questionsClone = _.cloneDeep(questions); 
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
        console.log("check>> :", type, id)
    }

    const handleAddRemoveAnswer = (type, questionId ,  answerId) =>{
        let questionsClone = _.cloneDeep(questions);
        if(type === 'ADD'){
            const newAnswer = {                    
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
             };

             let index = questionsClone.findIndex(item => item.id === questionId);
             questionsClone[index].answers.push(newAnswer);
             setQuestions(questionsClone);
        }

        if(type === "REMOVE"){
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
       console.log("check>> :", type, questionId ,  answerId)
    }
    
    console.log("questions", questions);
    return(
        <div className="question-container">
            <div className="title">
                Manage Questions     
            </div>    
            <hr/>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz: </label>
                    <Select
                                defaultValue={selectdQuiz}
                                onChange={setSelectdQuiz}
                                options={options}                          
                    />
                </div>
               
                <div className='mt-3 mb-2'>
                    Add question:
                </div>
            {
                questions && questions.length > 0
                && questions.map((question, index) => {
                    return (
                        <div key= {question.id} className='q-main mb-4'>                                 
                            <div className='questions-content'>                    
                                <div className="form-floating description">
                                    <input
                                        type="type"
                                        className="form-control"  
                                        placeholder="name@example.com"
                                        value={question.description}
                                        
                                        />
                                    <label> Question {index+1} 's description</label>
                                </div>
                                <div className='group-upload'>
                                    <label >
                                        <RiImageAddFill className='label-up'/>
                                    </label>
                                    <input type={'file'} hidden/>
                                    <span>0 file is uploaded</span>
                                </div>
                                <div className='btn-add'>
                                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                    <FiPlusSquare  className='icon-add'/>
                                    </span>
                                    {questions.length > 1 && 
                                        <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                        <AiFillMinusSquare className='icon-remove' />
                                        </span>
                                    }
                                   
                                </div>
        
                            </div>
                            {
                                question.answers && question.answers.length > 0 
                                && question.answers.map((answers, index) => {
                                    return(
                                        <div key={answers.id} className='answer-content'>
                                        <input 
                                            className="form-check-input isconrrect"
                                            type="checkbox" 

                                        />
                                        <div className="form-floating anwser-name">
                                            <input 
                                            value={answers.description}
                                            type="type" 
                                            className="form-control"  
                                            placeholder="name@example.com"/>
                                            <label>Answer {index + 1}</label>
                                        </div>
                                        <div className='btn-group'>
                                            <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                            <FiPlusSquare  className='icon-add'/>
                                            </span>
                                            {
                                                question.answers.length > 1 && 
                                                <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id ,answers.id)}>
                                                <AiFillMinusSquare className='icon-remove' />
                                                </span>
                                            }
                                            
                                        </div>
                                    </div>
                                    )
                                })
                            }
                          
                        </div>
                    )

                })
            }
                  
            
            </div>
        </div>
    )
}
export default Questions;