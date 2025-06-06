import axios from "../axios";

const handleLoginApi = (username, password) => {
   // Kiểm tra nếu là số điện thoại (chỉ chứa số, độ dài 9-11)
   const isPhone = /^\d{9,11}$/.test(username.trim());

   return axios.post('/api/login', {
      identifier: username.trim(),
      password
   });

};

const getAllUsers = (inputId) => {
   return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
   return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
   return axios.delete('/api/delete-user', {
      data: {
         id: userId
      }
   })
}

const editUserService = (inputData) => {
   return axios.put('/api/edit-user', inputData);
}


export {
   handleLoginApi,
   getAllUsers,
   createNewUserService,
   deleteUserService,
   editUserService,
};
