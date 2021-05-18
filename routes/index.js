const express = require('express');
const asyncHandler = require('express-async-handler');
const { getCocktailPrice } = require('../model/commands');
const router = express.Router();

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    let result = await getCocktailPrice();
    res.status(result.code).json(result.data);
  }),
);

module.exports = router;
