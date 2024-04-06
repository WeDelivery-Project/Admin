import { Request } from './config';

// api calls

export const getAdmins = () =>
  new Promise((resolve, reject) => {
    Request.get('/admin')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getAdminById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/admin/find/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createAdmin = (admin) =>
  new Promise((resolve, reject) => {
    Request.post('/admin', admin)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateAdmin = (admin, id) =>
  new Promise((resolve, reject) => {
    Request.put(`/admin/${id}`, admin)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteAdmin = (adminId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/admin/${adminId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const login = async (credentials) => {
  try {
    const res = await Request.post('/admin/login', credentials);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const tryLoginWithToken = async () => {
  try {
    const res = await Request.get('/admin/token');
    console.log(res.status);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
