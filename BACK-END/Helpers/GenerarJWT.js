import jwt from "jsonwebtoken";

function generarJWT(info = {}) {
  return jwt.sign(info, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}
export default generarJWT;
