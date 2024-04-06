import { Request } from './config';

// api calls

export const getPayments = () =>
  new Promise((resolve, reject) => {
    Request.get('/payment')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const getPaymentById = (id) =>
  new Promise((resolve, reject) => {
    Request.get(`/payment/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const createPayment = (payment) =>
  new Promise((resolve, reject) => {
    Request.post('/payment', payment)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err.toJSON());
      });
  });

export const updatePayment = (payment) =>
  new Promise((resolve, reject) => {
    Request.put('/payment', payment)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deletePayment = (paymentId) =>
  new Promise((resolve, reject) => {
    Request.delete(`/payment/${paymentId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
