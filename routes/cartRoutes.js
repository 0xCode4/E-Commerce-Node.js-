const express = require("express");
const {
  addProductToCart,
  getLoggedUserCart,
  removeCartItem,
  removeAllCartItems,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartController");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("user"), getLoggedUserCart)
  .post(protect, restrictTo("user"), addProductToCart)
  .delete(protect, restrictTo("user"), removeAllCartItems);

router.patch(
  "/applyCoupon",
  protect,
  restrictTo("user"),
  applyCoupon
);

router
  .route("/:id")
  .delete(protect, restrictTo("user"), removeCartItem)
  .patch(protect, restrictTo("user"), updateCartItemQuantity);

module.exports = router;
