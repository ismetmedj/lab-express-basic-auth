const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/", require("./signup.routes"));
router.use("/", require("./login.routes"));
router.use("/", require("./profil.routes"));

module.exports = router;
