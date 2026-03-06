import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default function auth(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).json({ message: "No Token" });

    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
}
