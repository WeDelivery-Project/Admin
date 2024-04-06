import { Request } from './config';

// api calls

export const getLivreurs = () =>
  new Promise((resolve, reject) => {

    Request.get('/livreur')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getLivreurById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/livreur/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createLivreur = (livreur) =>
  new Promise((resolve, reject) => {
    Request.post('/livreur', livreur)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateLivreur = (livreur, id) =>
  new Promise((resolve, reject) => {
    Request.put(`/livreur/${id}`, livreur)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteLivreur = (livreurId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/livreur/${livreurId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
