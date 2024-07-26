import jwt from "jsonwebtoken";

const createToken = (payload: Object) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found in process.env");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

export default createToken;
