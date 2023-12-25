const sendSuccessResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: true,
    data: data.data,
  });
};
module.exports = sendSuccessResponse;
