const { userAuth, adminAuth } = require("../controllers/auth.controller");
const router = require("express").Router();

router.route("/admin").post(adminAuth);
router.route("/user").post(userAuth);

module.exports = router;
