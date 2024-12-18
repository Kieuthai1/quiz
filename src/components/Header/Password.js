import { postChangePassword } from "../../services/apiService";

import { useEffect, useState } from "react";

import _ from "lodash";
import { toast } from "react-toastify";




const Password  = () =>{
        const [current_password, setCurrent_password] = useState("");
        const [new_password, setNew_password] = useState("");
        const [dataUpdate, setDataUpdate] = useState({});
        const [confirm_password, setConfirm_password] = useState("");



      useEffect(() => {
        if (dataUpdate && !_.isEmpty(dataUpdate)) {
          // update state
          setCurrent_password(dataUpdate.current_password);
          setNew_password(dataUpdate.new_password);
          
        }
      }, [dataUpdate]);

    const handUpdateChangePassword = async () => {
        if (new_password !== confirm_password) {
          toast.error("New Password and Confirm Password do not match!");
          return;
        }
      
        let data = await postChangePassword(current_password, new_password);
        console.log("component res: ", data);
        if (data && data.EC === 0) {
          toast.success(data.EM);
          // Gọi API hoặc cập nhật danh sách người dùng
        } else if (data && data.EC !== 0) {
          toast.error(data.EM);
        }
      };
      
    return(
        <>
            <form className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Current Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={current_password}
                 onChange={(event) => setCurrent_password(event.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">New Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={new_password}
                 onChange={(event) => setNew_password(event.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Confirm Password</label>
                <input
                    type="text"
                    className="form-control"
                    value={confirm_password}
                    onChange={(event) => setConfirm_password(event.target.value)}
                    />
              </div>
            </form>
            <div>
              <hr/>
             <button className="btn btn-warning"   onClick={() => handUpdateChangePassword()}> Update</button>
            </div>
          
          </>
        
   );
}

export default Password;