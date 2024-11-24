import CountDown from "./CountDown";
import { useRef } from "react";


const RightContent = (props) =>{
    const refDiv = useRef([]);

    
    const {dataQuiz} = props;

    const onTimeUp = () =>{
        props.handleFinishQuiz();
    }


    const getClassQuestion = (index, question) =>{
        console.log(index, question)
        //check answered
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true );
            if( isAnswered){
                return "question_content selected";
            }
        }
        return "question_content ";
    }

    const handleClickQuestion = (index ,question) =>{
        if(refDiv.current){
            refDiv.current.forEach(item =>{
                if(item && item.className === "question_content clicked" ){
                    item.className ="question_content"
                }
            })
        }
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true );
            if( isAnswered){
                return;
            }
          
        }
        refDiv.current[index].className ="question_content clicked"
        props.setIndex(index)
    }
    return(
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                  &&  dataQuiz.map((item, index)=>{
                        return(
                        <div key={`question-abc-${index}`} 
                        className={getClassQuestion(index, item)}
                        onClick={() => handleClickQuestion(index, item)}
                        ref={el => refDiv.current[index] = el}
                        
                        >{index+1}</div> 
                   ) })
                }
              
                  
            </div>
        </>
    )
}
export default RightContent;