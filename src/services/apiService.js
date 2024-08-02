import axios from '../utils/axiosCustomize';
const postCeateNewUser = (email, password, username, role,image) => {
        //submit data
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);
        return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
        return axios.get('api/v1/participant/all');
}
export {postCeateNewUser, getAllUsers}