const express = require("express");
const {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin", "manager"), getCoupons)
  .post(protect, restrictTo("admin", "manager"), createCoupon);

router
  .route("/:id")
  .get(protect, restrictTo("admin", "manager"), getCoupon)
  .patch(protect, restrictTo("admin", "manager"), updateCoupon)
  .delete(protect, restrictTo("admin", "manager"), deleteCoupon);

module.exports = router;
