const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  uploadUserProfileImg,
  resizeImage,
  getLoggedUser,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUser
} = require("../controllers/userController");

const {
  getUserValidator,
  createUserValidator,
  deleteUserValidator,
  updateUserValidator,
  updatePasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidators");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.get("/getMe", protect, getLoggedUser, getUser);
router.patch("/updateMyPassword", protect, updateLoggedUserPassword);
router.patch("/updateMyData", protect, updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", protect, deleteLoggedUser);

router
  .route("/")
  .get(protect, restrictTo("admin", "manager"), getUsers)
  .post(
    protect,
    restrictTo("admin"),
    uploadUserProfileImg,
    resizeImage,
    createUserValidator,
    createUser
  );

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getUserValidator, getUser)
  .patch(
    protect,
    restrictTo("admin"),
    uploadUserProfileImg,
    resizeImage,
    updateUserValidator,
    updateUser
  )
  .delete(
    protect,
    restrictTo("admin"),
    deleteUserValidator,
    deleteUser
  );

router.patch(
  "/updatePassword/:id",
  protect,
  updatePasswordValidator,
  updatePassword
);

module.exports = router;
