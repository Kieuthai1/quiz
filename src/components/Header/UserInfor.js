import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcPlus } from "react-icons/fc";
import "./Share.scss";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import { postUpdateUser } from "../../services/apiService";
import { toast } from "react-toastify";

const UserInfor = () => {
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preViewImage, setPreviewImage] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});

  console.log("check data: ", account);

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      // update state
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const handUpdateUser = async () => {
    let data = await postUpdateUser(account.access_token, username, image);
    console.log("component res: ", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);

      await account.fetchListUsersWithPaginate(account.currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      //   setPreviewImage("");
    }
  };

  return (
    <>
      <form className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={role}
            disabled
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="col-mid-12">
          <label className="form-label label-upload" htmlFor="labelUpload">
            <FcPlus /> Upload File image
          </label>
          <input
            type="file"
            hidden
            id="labelUpload"
            onChange={(event) => handleUploadImage(event)}
          />
        </div>
        <div
          className="col-mid-12 img-preview"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {preViewImage ? (
            <img src={preViewImage} className="img-user" />
          ) : (
            <span>Preview img</span>
          )}
        </div>
      </form>
      <div>
        <hr />
        <button className="btn btn-warning" onClick={() => handUpdateUser()}>
          {" "}
          Update
        </button>
      </div>
    </>
  );
};

export default UserInfor;
