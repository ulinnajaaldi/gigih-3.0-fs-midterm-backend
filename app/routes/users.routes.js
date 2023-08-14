module.exports = (app) => {
  const users = require("../controllers/users.controllers.js");
  const {
    validateRegister,
    validateLogin,
  } = require("../middlewares/validator-input.js");
  const { authToken } = require("../middlewares/auth-jwt.js");
  const router = require("express").Router();

  router.post("/auth/register", validateRegister, users.register);
  router.post("/auth/login", validateLogin, users.login);
  router.post("/auth/refresh-token", users.refreshToken);

  router.get("/auth/user", authToken, users.getUser);
  router.put("/auth/user", authToken, users.updateUser);
  router.patch("/auth/user", authToken, users.updateUser);
  router.delete("/auth/user", authToken, users.deleteUser);
  router.get("/user/:id", users.getUserDetails);

  app.use("/", router);
};
