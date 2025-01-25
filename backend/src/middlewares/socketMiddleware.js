module.exports = (req, res, next) => {
  req.io = io; // Attach the Socket.IO instance to req
  next();
};
