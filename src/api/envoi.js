import { Request } from './config';

// api calls

export const getEnvois = () =>
  new Promise((resolve, reject) => {
    Request.get('/envoi')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getEnvoiById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/envoi/find/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getManyEnvoi = (ids) =>
  new Promise((resolve, reject) => {
    Request.post(`/envoi/get-many`, ids)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createEnvoi = (envoi) =>
  new Promise((resolve, reject) => {
    Request.post('/envoi', envoi)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateEnvoi = (envoi, id) =>
  new Promise((resolve, reject) => {
    Request.put(`/envoi/${id}`, envoi)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteEnvoi = (envoiId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/envoi/${envoiId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteManyEnvoi = (envois) =>
  new Promise((resolve, reject) => {
    Request.post(`/envoi/delete`, envois)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const updateEtatsOfEnvoi = (id, etats) =>
  new Promise((resolve, reject) => {
    Request.put(`/envoi/etats/${id}`, etats)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
