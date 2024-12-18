import { useState } from "react";
import Select from "react-select";
import "./ManageQuiz.scss";
import { postCreatNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const options = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [desription, setDesription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);
  const [dataCreate, setDataCreate] = useState({});

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSumbitQuiz = async () => {
    // validate
    if (!name || !desription) {
      toast.error("Name/Description is requied");
      return;
    }
    let res = await postCreatNewQuiz(desription, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDesription("");
      setImage(null);
      window.location.reload();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-4"
      >
        <Tab eventKey="home" title="Mange Quizzes">
          <div className="add-news ">
            <fieldset className="border rounded-3 p-3">
              <legend legend className="float-none w-auto px-3">
                Add new Quiz:
              </legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="your quiz name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Desription"
                  value={desription}
                  onChange={(event) => setDesription(event.target.value)}
                />
                <label>Description</label>
              </div>
              <div className="my-3">
                <Select
                  value={type}
                  defaultValue={type}
                  onChange={setType}
                  options={options}
                  placeholder={"Quiz type"}
                />
              </div>
              <div className="more-actions form-group">
                <label className="mb-1"> Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => handleChangeFile(event)}
                />
              </div>
              <div className="mt-3">
                <button
                  onClick={() => handleSumbitQuiz()}
                  className="btn btn-warning"
                >
                  Save{" "}
                </button>
              </div>
            </fieldset>
          </div>
          <div className="list-detail">
            <TableQuiz />
          </div>
        </Tab>
        <Tab eventKey="Update Q/A Quizzes" title="Update Q/A Quizzes">
          <QuizQA />
        </Tab>

        <Tab eventKey="Assign to Users" title="Assign to Users">
          <div className="AssignQuiz">
            <AssignQuiz />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
export default ManageQuiz;
