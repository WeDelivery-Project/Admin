import { Request } from './config';

// api calls

export const getParemeters = () =>
  new Promise((resolve, reject) => {
    Request.get('/parameter')
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const updateParameter = (parameter) =>
  new Promise((resolve, reject) => {
    Request.put('/parameter', parameter)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
