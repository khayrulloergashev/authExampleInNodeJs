const router = require("express").Router();

const AuthRouter = require("./routers/auth.router");
const UserRouter = require("./routers/user.router");

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);

module.exports = router;
