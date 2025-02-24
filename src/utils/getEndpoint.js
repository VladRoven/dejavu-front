const getEndpoint = (path) => {
  return `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}${
    process.env.REACT_APP_API_PORT ? `:${process.env.REACT_APP_API_PORT}` : ''
  }${process.env.REACT_APP_API_PREFIX}/${path}`;
};

export default getEndpoint;
