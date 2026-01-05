const express = require("express");

const {
  createCashOrder,
  getAllOrders,
  getOrder,
  getAllOrdersForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkOutSession
} = require("../controllers/orderController");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.get(
  "/checkout-session/:id",
  protect,
  restrictTo("user"),
  checkOutSession
);

router
  .route("/")
  .get(
    protect,
    restrictTo("admin", "manager", "user"),
    getAllOrdersForLoggedUser,
    getAllOrders
  )
  .post(
    protect,
    restrictTo("user"),
    createCashOrder
  );

router.get(
  "/:id",
  protect,
  restrictTo("admin", "manager", "user"),
  getOrder
);

router.patch(
  "/:id/pay",
  protect,
  restrictTo("admin", "manager"),
  updateOrderToPaid
);

router.patch(
  "/:id/deliver",
  protect,
  restrictTo("admin", "manager"),
  updateOrderToDelivered
);

module.exports = router;
