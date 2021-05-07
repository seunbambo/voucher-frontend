export const apiEndPoint = () => {
  // return 'http://localhost:5000';
  return 'https://voucher-app-backend.herokuapp.com';
};

export const configHeader = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return config;
};
