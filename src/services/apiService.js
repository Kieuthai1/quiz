import { delay } from 'lodash';
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

const putUpdateUser = (id,username, role,image) => {
        //submit data
        const data = new FormData();
        data.append('id', id); 
        data.append('username', username);
        data.append('role', role);
        data.append('userImage', image);
        return axios.put('api/v1/participant', data);
}
const deleteUser = (userId) => {
        return axios.delete('api/v1/participant', {data: {id: userId}});
}
const getUserWithPaginate = (page, limit) => {
        return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (email, password) =>{
        return axios.post(`/api/v1/login`,
                {
                 email, 
                 password,
                 delay: 4000
        
                }
        );
}
const postRegiter = (email, password, username) => {
        return axios.post(`/api/v1/register`,{email, password, username});
}

const getQuizByUser = () => {
        return axios.get('/api/v1/quiz-by-participant');
}
const getDataQuiz = (id) =>{
        return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const  postSubmitQuiz = (data) =>{
        return axios.post(`/api/v1/quiz-submit`, {...data});
}
const postCreatNewQuiz = (description, name, difficulty, image) =>{
        const data = new FormData();
        data.append('description', description);
        data.append('name', name);
        data.append('difficulty', difficulty);
        data.append('quizImage', image);

        return axios.post(`api/v1/quiz`, data);
}
export {postCeateNewUser, getAllUsers, putUpdateUser,
        deleteUser, getUserWithPaginate, postLogin,
        postRegiter, getQuizByUser, getDataQuiz,
         postSubmitQuiz, postCreatNewQuiz}