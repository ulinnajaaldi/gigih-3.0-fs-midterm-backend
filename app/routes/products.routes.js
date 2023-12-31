module.exports = (app) => {
  const products = require("../controllers/products.controllers");
  const { authToken } = require("../middlewares/auth-jwt.js");
  const { validateProduct } = require("../middlewares/validator-input.js");
  const router = require("express").Router();

  router.post("/:id", validateProduct, authToken, products.create);
  router.get("/video/:id", products.getProductsByVideoId);
  router.get("/:id", products.getProductsById);
  router.put("/:id", authToken, products.update);
  router.patch("/:id", authToken, products.update);
  router.delete("/:id", authToken, products.delete);

  app.use("/products", router);
};
