import { Request } from './config';

export const getSousetats = () =>
  new Promise((resolve, reject) => {
    Request.get('/sousetat')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getSousetatById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/sousetat/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateEtat = (etat) =>
  new Promise((resolve, reject) => {
    Request.put('/sousetat', etat)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
