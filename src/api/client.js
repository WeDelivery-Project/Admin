import { Request } from './config';

// api calls

export const getClients = () =>
  new Promise((resolve, reject) => {
    Request.get('/client')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getClientById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/client/find/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createClient = (client) =>
  new Promise((resolve, reject) => {
    Request.post('/client', client)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updateClient = (client, id) =>
  new Promise((resolve, reject) => {
    Request.put(`/client/${id}`, client)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteClient = (clientId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/client/${clientId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
