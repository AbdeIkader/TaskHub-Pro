export const errorHandling = (err, req, res, next) => {
  let status = err.statusCode || 500;
  console.log(err);

  process.env.MODE == "prod"
    ? res.status(status).json({ Err: err.message })
    : res.status(status).json({ Err: err.message, stack: err.stack });
};
