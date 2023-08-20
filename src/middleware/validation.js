import { AppError } from "../utils/AppError.js";

const validation = (schema, source) => {
  return (req, res, next) => {
    let dataToValidate = {};

    if (source === "body") {
      dataToValidate = req.body;
    } else if (source === "params") {
      dataToValidate = req.params;
    }
    const { error } = schema.validate(dataToValidate, { abortEarly: false });
    if (!error) {
      next();
    } else {
      next(new AppError(error));
    }
  };
};

export { validation };
