const { Router } = require("express");
const { login, register, isloggedin,auth ,logout, addToHistory,getUserHistory} = require("../controllers/functions");
const router = Router();


router.route("/logout").post(logout);
router.route("/auth").post(auth)
router.route("/login").post(login)
router.route("/register").post(register)
router.route("/add_to_activity").post(addToHistory)
router.route("/get_all_activity").post(getUserHistory)

module.exports = router;