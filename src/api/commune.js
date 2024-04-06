import { Request } from './config';

// api calls

export const getCommunes = () =>
  new Promise((resolve, reject) => {
    Request.get('/commune')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getCommuneById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/commune/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
