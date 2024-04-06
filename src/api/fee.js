import { Request } from './config';

// api calls

export const getfees = () =>
  new Promise((resolve, reject) => {
    Request.get('/fee')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getfeeById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/fee/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateFee = (fee) =>
  new Promise((resolve, reject) => {
    Request.put('/fee', fee)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
