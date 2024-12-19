import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
  const { data, index, isShowAnswer } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHanleCheckbox = (event, aId, qId) => {
    // console.log("check>> ", .target.checked );
    console.log(">>>>> data props", aId, qId);
    props.handleCheckbox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"> </div>
      )}

      <div className="question">
        Question {index + 1}: {data.questionDescription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, i) => {
            return (
              <div key={`answer-${i}`} className="a-child">
                <div className="form-check">
                <input
                    id={`checkbox-${i}-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    disabled={props.isSubmitQuiz}
                    onChange={(event) =>
                      handleHanleCheckbox(event, a.id, data.questionId)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`checkbox-${i}-${index}`}
                  >
                    {a.description}
                  </label>
                  {isShowAnswer === true && (
                    <>
                      {a.isSelected === true && a.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}

                      {a.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
