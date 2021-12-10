
const { requireSignin, userMiddleware } = require("../mediatorPerson/middle");
const { addOrder, getOrders} = require("../controllerRaedjd/bill");
const router = require("express").Router();

router.post("/addorder", requireSignin, userMiddleware, addOrder);
router.get("/getorders", requireSignin, userMiddleware, getOrders);

module.exports = router; 