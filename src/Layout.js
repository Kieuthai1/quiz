import { BrowserRouter,
    Routes, 
    Route, } from 'react-router-dom';
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import Regiter from './components/Auth/Regiter';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from './components/User/ListQuiz';
const Layout = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<App/>} >
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<ListQuiz />} />            
                </Route>
            <Route path='/admin' element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-users' element={<ManageUser />} />   
            </Route>

            <Route path='/login' element={<Login />} />   
            <Route path='/regiter' element={<Regiter />} />   

            </Routes>
            <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
        </>
    )
}
export default Layout;