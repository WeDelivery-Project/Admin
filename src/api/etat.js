import { Request } from './config';

export const getEtats = () =>
  new Promise((resolve, reject) => {
    Request.get('/etat')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getEtatById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/etat/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateEtat = (etat) =>
  new Promise((resolve, reject) => {
    Request.put('/etat', etat)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
