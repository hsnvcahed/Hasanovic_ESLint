const errorHandler = (err, req, res, next) => {
  console.log('ERROR =======> ', err.message.red.inverse);
  res.status(500).json({
    code: 500,
    data: 'Server Error',
  });
};

const notFoundHandler = (req, res) => {
  console.log('Not Found =======> ', req.originalUrl.blue.inverse);
  res.status(404).json({
    code: 404,
    data: `The requested resource could not be found on this server`,
  });
};

module.exports = { errorHandler, notFoundHandler };
