export const handleError = (error, res) => {
  res.status(res.statusCode).json({
    error: error.toString()
  });
};

export default handleError;
