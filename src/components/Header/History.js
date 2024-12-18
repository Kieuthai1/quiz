import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHistory } from '../../services/apiService';
import moment from 'moment';


const History  = () =>{
    const [listHistory, setListHistory] = useState([]);
    const account = useSelector((state) => state.user.account);


    useEffect(() => {
         fetchlistHistory();
    },[]);

    const fetchlistHistory = async() => {
        let res = await getHistory();
        if(res && res.EC === 0){
            let newData = res?.DT?.data?.map(item => {
                return{
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if(newData.length > 7 ){
                newData = newData.slice(newData.length - 7, newData.length)
            }
            setListHistory(newData);
             console.log("check newData: ", newData)

        }
            // console.log("check res: ", res)
         
    }

    return(
        <>
    <Table striped="columns">
      <thead>
        <tr>
          <th>ID</th>
          <th>Quiz Name</th>
          <th>Total Question</th>
          <th>Total Corrent</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {listHistory && listHistory.length > 0 &&
                listHistory.map( (item, index) => {
                   
                    return(// key không bị trùng với chỉ số index
                        <tr key={`table-user-${index}`}> 
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.total_questions}</td>
                            <td>{item.total_correct}</td>
                            <td>{item.date}</td>

                        </tr>
          
                    )

                    }) 
                }
            {listHistory && listHistory.length === 0 && 
                <tr>
                    <td colSpan={'5'} >not found data</td>
                </tr>}
       
      </tbody>
    </Table>
        </>
   );
}

export default History;