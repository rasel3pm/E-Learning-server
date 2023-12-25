const notFound = (req, res) => {
  res.status(404).json({
    status: false,
    message: `Route Not Found! for ${req.originalUrl}`,
  });
};

module.exports = notFound;
