import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res.data); };

export const getUserList = params => {
    // alert(`${base}/user/list`);
    // return axios.get(`${base}/user/list`, { params: params });
    return axios.get(`${base}/api/user/list`, { params: params });
};
export const getDefault = params => {
    alert("default");
    return axios.get(`/api/default`, { params: params });
}

export const getUserListPage = params => {
    return axios.get(`${base}/api/user/list`, { params: params });
    // return axios.get(`${base}/user/listpage`, { params: params });
};

export const getServerListPage = params => { return axios.get(`${base}/api/nginx/findAll`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const removeServer = params => { return axios.get(`${base}/api/nginx/delete`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/api/nginx/update`, { params: params }); };

export const editServer = params => { return axios.post(`${base}/api/nginx/update`,params).then(res => res.data); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const addServer = params => { return axios.post(`${base}/api/nginx/add`, { params: params }); };
