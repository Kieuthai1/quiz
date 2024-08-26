
const TableUser = (props) => {
    const {listUsers} = props;
    // const listUsers = props.listUsers;
    return(
        <>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th> Action ư</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                listUsers.map( (item, index) => {
                   
                    return(// key không bị trùng với chỉ số index
                        <tr key={`table-user-${index}`}> 
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => props.handleBtnView(item)}
                                    >View</button>
                                <button 
                                    className="btn btn-warning mx-3"
                                    onClick = {() => props.handleClickBtnUpdate(item)}
                                    >Update</button>
                                <button className="btn btn-danger" 
                                        onClick={() => props.handleClickBtnDelete(item)}
                                            >Delete</button>
                            </td>
                            </tr>
          
                    )

                    }) 
                }
 {listUsers && listUsers.length === 0 && <tr><td colSpan={'4'} >not found data</td></tr>}

      

            </tbody>
            </table>
        </>
    )
    
}

export default TableUser;