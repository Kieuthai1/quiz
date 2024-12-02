import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

const ListQuiz = (props) =>{
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();



    useEffect(()=>{
        getQuizData();
    },[]);
    const getQuizData = async() =>{
     const res =  await getQuizByUser();
        if(res && res.EC === 0){
            setArrQuiz(res.DT);
        }
    }
    return(
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 && 
                arrQuiz.map((quiz, index) =>{
                    return(
                    <div key ={`${index}-quiz`} className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src={`data:image/jpeg;base64, ${quiz.image}`} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Quiz {index+1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            
                        </div>
                        <div className="btn-start">
                            <button  
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, 
                                        {state: {quizTitle: quiz.description}})}
                                >{t('homepage.title7')}</button>
                            </div>
                        </div>
                    )
                })
            }
          {arrQuiz && arrQuiz.length === 0 &&
            <div>
                You don't any quiz now ..
            </div>
          }
        </div>
    )
}
export default ListQuiz;