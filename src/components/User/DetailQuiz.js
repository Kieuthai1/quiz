import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from 'lodash';
import  './DetailQuiz.scss';
import Question from "./Question";

const DetailQuiz = (props) =>{
    const params = useParams();
    const location = useLocation();
    const  quizId   = params.id;

    const[dataQuiz, setDataQuiz] = useState([]);
    const[index, setIndex] = useState(0);

    useEffect(()  => {
        fetchQuestions();
    },[quizId])

    const fetchQuestions = async() =>{
      let res = await getDataQuiz(quizId);
      console.log('checll>> ', res);
      if(res && res.EC ===0 ){
        let raw = res.DT;
        let data = _.chain(raw) // chuyen du lieu cho lodash sd 
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => { 
            let answers = [];
            let questionDescription, image = null;
            value.forEach((item, index) => {
                if(index === 0){
                    questionDescription = item.description;
                    image = item.image;
                }
                item.answers.isSelected = false;
                answers.push(item.answers);         
            })
            console.log('value' , value,  'key', key);
           
            return{ questionId: key, answers, questionDescription, image}
        })
        .value()
        console.log(data)
        setDataQuiz(data);
      }
    }
   console.log(">>>>>check dataQuiz ", dataQuiz);
    const handlePrev = () =>{
        if(index - 1 < 0 ) return;
        
        setIndex(index - 1);
    }
    const handleNext = () =>{
        if(dataQuiz && dataQuiz.length > index + 1 )
        setIndex(index + 1);
    }
    const handleCheckbox = (answersId, questionId) =>{
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if(question && question.answers){

        let b =  question.answers.map(item =>{
                    if(+item.id === +answersId){
                        item.isSelected = !item.isSelected;
                    }
                    return item;
          })  
          question.answers = b;

       //   console.log(b)
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if(index > - 1){
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
        
    }   
    return(
        <div className="detail-quiz-container">
               <div className="left-content">
                        <div className="title">
                 Quiz: {quizId} {location?.state?.quizTitle}
                        </div>
                        <hr/>
                        <div className="q-body">
                            <img />
                        </div>
                        <div className="q-content">
                           <Question 
                           index = {index}
                           handleCheckbox = {handleCheckbox}
                           data={
                            dataQuiz && dataQuiz.length >0 
                            ?
                             dataQuiz[index] 
                             : []
                        }/> 
                        </div>
                       <div className="footer">     
                        <button className="btn btn-secondary "
                        onClick={() => handlePrev()}
                        >Perv</button>
                        <button className="btn btn-primary "
                          onClick={() => handleNext()}
                        >Next</button>
                      <button className="btn btn-warning "
                          onClick={() => handleNext()}
                        >Finish</button>
                       </div>
               </div>
               <div className="right-content">
                    count down
               </div>
        </div>
    )
}
export default DetailQuiz;