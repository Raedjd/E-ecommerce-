const express = require('express');
const { requireSignin, userMiddleware } = require('../mediatorPerson/middle');
const { addAddress, getAddress } = require('../controllerRaedjd/address');
const router = express.Router();


router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.get('/user/getaddress', requireSignin, userMiddleware, getAddress);

module.exports = router;