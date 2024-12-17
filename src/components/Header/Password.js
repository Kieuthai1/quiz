const Password  = () =>{
    return(
        <>
            <form className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Current Password</label>
                <input
                  type="text"
                  className="form-control"
               //   value={username}
                //  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">New Password</label>
                <input
                  type="text"
                  className="form-control"
               //   value={username}
                //  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="text"
                  className="form-control"
               //   value={username}
                //  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </form>
            <div>
              <hr/>
             <button className="btn btn-warning"  > Update</button>
            </div>
          
          </>
        
   );
}

export default Password;