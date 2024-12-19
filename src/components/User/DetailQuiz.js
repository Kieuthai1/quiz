import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useTranslation, Trans } from "react-i18next";
import Language from "../Header/Language";
import { Nav } from "react-bootstrap";

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);


  const { t } = useTranslation();
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            item.answers.isCorrect = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);

          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;

    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };
  const handleCheckbox = (answersId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // react hook doesn't merge state
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answersId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });

      // console.log("check box b", b)
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
    //   console.log("check box1" )
  };

  const handleFinishQuiz = async () => {
    //  console.log("<<<<< check data before", dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        // todo : userAnswerId
        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });

      payload.answers = answers;
      //submit api
      let res = await postSubmitQuiz(payload);
      // console.log(">>> check data before submit: ", res);
      if (res && res.EC === 0) {
        setIsSubmitQuiz(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);

        console.log("check res ", res);

        // update DataQuiz with correct answer
        if (res.DT && res.DT.quizData) {
          let dataQuizClone = _.cloneDeep(dataQuiz);
          let a = res.DT.quizData;
          for (let q of a) {
            for (let i = 0; i < dataQuizClone.length; i++) {
              if (+q.questionId === +dataQuizClone[i].questionId) {
                // update answer
                let newAnswers = [];
                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                  let s = q.systemAnswers.find(
                    (item) => +item.id === +dataQuizClone[i].answers[j].id
                  );
                  if (s) {
                    dataQuizClone[i].answers[j].isCorrect = true;
                  }
                  newAnswers.push(dataQuizClone[i].answers[j]);
                }
                dataQuizClone[i].answers = newAnswers;
              }
            }
          }
         
          setDataQuiz(dataQuizClone);
         
        }
      } else {
        alert("something wrongs>>>>");
      }
    }
  };
  const handleShowAnswer = () => {
    console.log("Trước khi setState:", isShowAnswer); // Debug trạng thái trước
    if (!isSubmitQuiz) return;
    setIsShowAnswer(true);
    console.log("Sau khi setState:", isShowAnswer); // Debug trạng thái sau
  };

  return (
    <>
      <div className="main-quiz-detai-new-header">
        <Breadcrumb className="quiz-detai-new-header">
          <NavLink to="/" className="breadcrumb-item">
            {t("header.title2")}
          </NavLink>
          <NavLink to="/users" className="breadcrumb-item">
            {t("header.title3")}
          </NavLink>
          <Breadcrumb.Item active>{t("header.title5")}</Breadcrumb.Item>
        </Breadcrumb>
        <span className="language-header">
          <Language />
        </span>
      </div>

      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz: {quizId} {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="q-body">
            <img />
          </div>
          <div className="q-content">
            <Question
              index={index}
              handleCheckbox={handleCheckbox}
              isShowAnswer={isShowAnswer}
              isSubmitQuiz={isSubmitQuiz}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary " onClick={() => handlePrev()}>
              Perv
            </button>
            <button className="btn btn-primary " onClick={() => handleNext()}>
              Next
            </button>
            <button
              disabled={isSubmitQuiz}
              className="btn btn-warning "
              onClick={() => handleFinishQuiz()}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setIndex}
            isSubmitQuiz = {isSubmitQuiz}
           
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
