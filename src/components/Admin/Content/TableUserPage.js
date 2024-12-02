import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useTranslation, Trans } from 'react-i18next';


const TableUserPage = (props) => {
    const { t } = useTranslation();
    const {listUsers, pageCount} = props;
    // const listUsers = props.listUsers;
      // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected +1);
    props.setCurrentPage(+event.selected +1);
    console.log(`User requested page number ${event.selected}`);
  };

    return(
        <>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">{t('amdin.TableUserPage.title0')}</th>
                <th scope="col">Email</th>
                <th scope="col">{t('amdin.TableUserPage.title1')}</th>
                <th> {t('amdin.TableUserPage.title2')}</th>
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
                                    >{t('amdin.TableUserPage.title4')}</button>
                                <button 
                                    className="btn btn-warning mx-3"
                                    onClick = {() => props.handleClickBtnUpdate(item)}
                                    >{t('amdin.TableUserPage.title5')}</button>
                                <button className="btn btn-danger" 
                                        onClick={() => props.handleClickBtnDelete(item)}
                                            >{t('amdin.TableUserPage.title6')}</button>
                            </td>
                            </tr>
          
                    )

                    }) 
                }
            {listUsers && listUsers.length === 0 && 
                <tr>
                    <td colSpan={'5'} >not found data</td>
                </tr>}

      

            </tbody>
            </table>  
            <div className="user-pagination d-flex justify-content-center">
            <ReactPaginate
                nextLabel={t('amdin.TableUserPage.title7')}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={t('amdin.TableUserPage.title8')}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />
            </div>





        </>
    )
    
}

export default TableUserPage;