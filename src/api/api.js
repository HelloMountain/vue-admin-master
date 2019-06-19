import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/api/login`, params).then(res => res.data); };

export const getUserList = params => {return axios.get(`${base}/api/user/list`, { params: params });};

export const getDefault = params => {return axios.get(`/api/default`, { params: params });};

export const getUserListPage = params => {return axios.get(`${base}/api/user/list`, { params: params });};

export const getSelfInfoPage = params => {return axios.get(`${base}/api/user/selfInfo`, { params: params });};

export const getPriListPage = params => {return axios.get(`${base}/api/admin/privilege/findAll`, { params: params });};

export const getServerListPage = params => { return axios.get(`${base}/api/nginx/findAll`, { params: params }); };

export const getServerLikeName = params => { return axios.get(`${base}/api/nginx/findByName`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/api/user/delete`, { params: params }); };

export const removeServer = params => { return axios.get(`${base}/api/nginx/delete`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/api/user/batchdelete`, { params: params }); };

export const batchRemoveServer = params => { return axios.get(`${base}/api/nginx/batchdelete`, { params: params }); };

export const batchRemovePri = params => { return axios.get(`${base}/api/admin/privilege/deleteByIds`, { params: params }); };

export const editUser = params => { return axios.post(`${base}/api/user/update`, params).then(res => res.data); };

export const editServer = params => { return axios.post(`${base}/api/nginx/update`,params).then(res => res.data); };

export const addUser = params => { return axios.post(`${base}/api/user/add`, params).then(res => res.data); };

export const addServer = params => { return axios.post(`${base}/api/nginx/create`, params).then(res => res.data); };

export const getServerById = params => { return axios.get(`${base}/api/nginx/findById`, { params: params }); };

export const getCode = params => { return axios.get(`${base}/api/test/code`, { params: params }); };

export const getPrivilegeUser = params => { return axios.get(`${base}/api/admin/privilege/findByUserName`, { params: params }); };

export const getPrivilegeServer = params => { return axios.get(`${base}/api/admin/privilege/findByNginxName`, { params: params }); };

export const getDataCode = params => { return axios.get(`${base}/api/data/code`, { params: params }); };

export const getTopIp = params => {return axios.get('/api/data/topIp', {params: params})};

export const getLeaderMessage = params =>{ return axios.get('')};

export const getMap = params =>{ return axios.get('/api/data/map')};

export const getAddr = params =>{ return axios.get('/api/data/addr', {params: params})};

export const getPUV = params => {return axios.get('/api/data/puv', {params: params})};

export const getResponseTime = params => { return axios.get('/api/data/topResponse')};

export const getTopUrl = params => { return axios.get('/api/data/topUrl')};

export const getErrorUrl = params => { return axios.get('/api/data/errorUrl')};

export const getBrowser = params => { return axios.get('/api/data/browser')};
