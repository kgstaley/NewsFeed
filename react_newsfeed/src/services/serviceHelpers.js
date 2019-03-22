const onGlobalSuccess = res => {
  return res.data;
};

const onGlobalError = err => {
  return Promise.reject(err);
};

export { onGlobalError, onGlobalSuccess };
