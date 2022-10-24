export const isErrorInFetchBaseQuery = (error) => {
  if ('data' in error) {
    return error.data.status;
  }
};
