import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UserInfor from "./UserInfor";
import Password from "./Password";
import History from "./History";
import "./Share.scss";
import { useState } from "react";

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  
  return (
    <>
      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        //  backdrop="static"
        className="modal-profile"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quản Lý Thông Tin Người Dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs className="mb-3" defaultActiveKey="profile">
            <Tab eventKey="home" title="Main Infor">
              <UserInfor  
               show={isShowModalProfile} setShow={setIsShowModalProfile}
              />
            </Tab>
            <Tab eventKey="Password" title="Password">
              <Password />
            </Tab>
            <Tab eventKey="History" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
