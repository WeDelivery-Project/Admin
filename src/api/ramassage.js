import { Request } from './config';

// api calls

export const getRamassages = () =>
  new Promise((resolve, reject) => {
    Request.get('/ramassage')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getRamassageById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/ramassage/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createRamassage = (ramassage) =>
  new Promise((resolve, reject) => {
    Request.post('/ramassage', ramassage)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateRamassage = (ramassage) =>
  new Promise((resolve, reject) => {
    Request.put('/ramassage', ramassage)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteRamassage = (ramassageId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/ramassage/${ramassageId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
