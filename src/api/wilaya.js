import { Request } from './config';

// api calls

export const getWilayas = () =>
  new Promise((resolve, reject) => {
    Request.get('/wilaya')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getWilayaById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/wilaya/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const modifyWilaya = (wilaya) =>
  new Promise((resolve, reject) => {
    Request.put(`/wilaya/${wilaya._id}`, wilaya)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
