import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
const TableQuiz = (props) => {

    const[listQuiz, setListQuiz] = useState([]);
    const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
    const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});



    useEffect(() =>{
        fetchQuiz();
    }, [])

    const fetchQuiz = async() =>{
        setDataUpdate({});
        setDataDelete({});
        let res = await getAllQuizForAdmin();
        if(res && res.EC === 0){
            setListQuiz(res.DT)
        }
      
    }
    const handleClickBtnDelete = (quiz) =>{
        setDataDelete(quiz);
        setIsShowModalDeleteQuiz(true);
       }
    const handleClickBtnUpdate = (quiz) => {
        setIsShowModalUpdateQuiz(true);
         setDataUpdate(quiz);
    }

    return(
        <>
            <div>List Quizzes: </div>
       
           <table className="table">
               <table className="table table-hover table-bordered my-2">
                        <thead>
                            <tr>
                            <th scope="col">ID </th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">type</th>
                            <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {listQuiz && listQuiz.map((item, index) =>{
                                return(
                                    <tr key={`table-quiz-${index}`}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{display: "flex", gap: "15px"}}>
                                        <button 
                                         className="btn btn-warning "
                                         onClick={() => handleClickBtnUpdate(item)}
                                        > Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleClickBtnDelete(item)}
                                        > Delete</button>

                                    </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                        </table>
                        <ModalDeleteQuiz
                            show = {isShowModalDeleteQuiz}
                            setShow = {setIsShowModalDeleteQuiz}
                            dataDelete = {dataDelete}
                            fetchQuiz = {fetchQuiz}

                        />
                        <ModalUpdateQuiz
                            show = {isShowModalUpdateQuiz}
                            setShow = {setIsShowModalUpdateQuiz}
                            dataUpdate = {dataUpdate}
                            fetchQuiz = {fetchQuiz}
                        />

        </table>
        </>
    )
}
export default TableQuiz;