import KEY from "../config.js";
import jwt from "jsonwebtoken";

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Not authorized" });
      }
      const { roles: userRoles } = jwt.verify(token, KEY.secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (Array.from(roles).includes(role)) {
          hasRole=true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "Not authorized" });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
};
export {roleMiddleware}
