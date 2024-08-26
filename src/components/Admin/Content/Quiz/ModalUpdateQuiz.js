import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import {  toast } from 'react-toastify';
import {putUpdateQuizForAdmin} from '../../../../services/apiService';
import _ from "lodash";

const  ModalUpdateQuiz = (props)=> {
  const {show, setShow, dataUpdate} = props;

  const handleClose = () => {
      setShow(false)
    props.resetUpdateData();
  };


        const [description, setDesription] = useState("");
        const [name, setName] = useState("");
        const [difficulty, setDifficulty] = useState("");
        const [image, setImage] = useState("");
        const [preViewImage, setPreviewImage] = useState("");
        
        useEffect(()=>{
            if(!_.isEmpty(dataUpdate)){
                // update state
                setDesription(dataUpdate.description);
                setName(dataUpdate.name);
                setDifficulty(dataUpdate.difficulty);
                setImage("");
                if(dataUpdate.image){
                    setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
                }
               
            }
        }, [props.dataUpdate]);

  const handleUploadImage = (event) => {
    if(event.target && event.target.files && event.target.files[0] ){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0])
    }else{
   //   setPreviewImage("");
    }
  }


  const handSubmitUpdateQuiz = async() =>{
            let data= await putUpdateQuizForAdmin(dataUpdate.id, description, name, difficulty, image);
            console.log("component res: ", data )
            if(data && data.EC === 0){
              toast.success(data.EM);
              handleClose();
              //   await props.fetchListUsers();
              // props.setCurrentPage(1);
              await props.fetchQuiz();       
            }
            if(data && data.EC !== 0){
              toast.error(data.EM);
            }
}


  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose} 
        size="xl"
        backdrop="static"
        className= 'modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
              <div className="col-md-6">
                <label  className="form-label">Description</label>
                <input 
                    type="description" 
                    className="form-control" 
                    value={description} 
                    onChange={(event) => setDesription(event.target.value)}/>
              </div>
              <div className="col-md-6">
                <label  className="form-label">Name</label>
                <input 
                    type="name" 
                    className="form-control" 
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label  className="form-label">Difficulty</label>
                <select  className="form-select" value={difficulty}
                 onChange={(event) => setDifficulty(event.target.value)}>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM" >MEDIUM</option>
                  <option value="HARD" >HARD</option>
                </select>
              </div>
              
             
     

              <div className='col-mid-12'>
                <label className='form-label label-upload' htmlFor='labelUpload'>
                  <FcPlus/>  Upload File image
                </label>
                <input 
                type='file' 
                hidden 
                id="labelUpload" 
                onChange={(event) => handleUploadImage(event)}/>
              </div>
              <div  className='col-mid-12 img-preview'>
                {preViewImage ? 
                   <img src={preViewImage}/>
                   :
                   <span>Preview img</span>
                }
              </div>

            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handSubmitUpdateQuiz()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateQuiz;