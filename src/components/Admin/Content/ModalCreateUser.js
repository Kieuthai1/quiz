import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import {  toast } from 'react-toastify';
import {postCeateNewUser} from '../../../services/apiService'
import { useTranslation, Trans } from 'react-i18next';

const  ModalCreateUser = (props)=> {
  const {show, setShow} = props;
  const handleClose = () => {
      setShow(false)
      setEmail("");
      setPassword("");
      setRole("USER");
      setUsername("");
      setPreviewImage("");
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preViewImage, setPreviewImage] = useState("");
  const { t } = useTranslation();

  const handleUploadImage = (event) => {
    if(event.target && event.target.files && event.target.files[0] ){
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0])
    }else{
   //   setPreviewImage("");
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handSubmitCreateUser = async() =>{
    // validate
    // const isValiEmail = validateEmail(email);
    // if(!isValiEmail){
    //  toast.error('Invali email')
    //   return;
    // }

    if(!password){
      toast.error('invali password')
      return;
    }
            let data= await postCeateNewUser(email, password, username, role, image);
            if(data && data.EC === 0){
              toast.success(data.EM);
              handleClose();
            //   await props.fetchListUsers();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);

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
          <Modal.Title>{t('amdin.ModalCreateUser.title0')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
              <div className="col-md-6">
                <label  className="form-label">Email</label>
                <input 
                          type="email" 
                          className="form-control" 
                          value={email} 
                          onChange={(event) => setEmail(event.target.value)}/>
              </div>
              <div className="col-md-6">
                <label  className="form-label">{t('amdin.ModalCreateUser.title1')}</label>
                <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label  className="form-label">{t('amdin.ModalCreateUser.title2')}</label>
                <input 
                      type="text" 
                      className="form-control" 
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}/>
              </div>
              <div className="col-md-4">
                <label  className="form-label">{t('amdin.ModalCreateUser.title3')}</label>
                <select  className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="USER">USER</option>
                  <option value="ADMIN" >ADMIN</option>
                </select>
              </div>
              <div className='col-mid-12'>
                <label className='form-label label-upload' htmlFor='labelUpload'>
                  <FcPlus/>  {t('amdin.ModalCreateUser.title4')}
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
                   <span>{t('amdin.ModalCreateUser.title5')}</span>
                }
              </div>

            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {t('amdin.ModalCreateUser.title6')}
          </Button>
          <Button variant="primary" onClick={() => handSubmitCreateUser()}>
          {t('amdin.ModalCreateUser.title7')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;