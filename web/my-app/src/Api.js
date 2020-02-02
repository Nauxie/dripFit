import axios from 'axios';

export const fetchData = filename => {
  const labelsPromise = fetchImgLabels(filename);
  return {
    labels: wrapPromise(labelsPromise)
  };
};

const wrapPromise = promise => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    res => {
      status = 'success';
      result = res;
    },
    err => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
};

const fetchImgLabels = async filename => {
  console.log('Fetching data...');
  let endpoint = 'http://localhost:5000?filename=' + filename;
  console.log(endpoint);
  return axios
    .get(endpoint)
    .then(res => res.data)
    .catch(err => console.log(err));
};
