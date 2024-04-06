import { Request } from './config';

// api calls

export const getRoles = () =>
  new Promise((resolve, reject) => {
    Request.get('/role')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getRoleById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/role/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createRole = (role) =>
  new Promise((resolve, reject) => {
    Request.post('/role', role)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateRole = (role, id) =>
  new Promise((resolve, reject) => {
    Request.put(`/role/${id}`, role)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteRole = (roleId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/role/${roleId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
