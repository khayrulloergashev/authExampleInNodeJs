const {
  addNew,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/user.controller");
const router = require("express").Router();
const authhenticate = require("../utils/authenticate");

router.use(authhenticate);

router.route("/").post(addNew);
router.route("/").get(getAll);
router.route("/:id").get(getOne);
router.route("/:id").put(updateOne);
router.route("/:id").delete(deleteOne);

module.exports = router;
