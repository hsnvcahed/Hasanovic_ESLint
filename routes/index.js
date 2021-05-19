const express = require('express');
const asyncHandler = require('express-async-handler');
const { getCocktailPrice, getCocktailIng, getCocktailPriceLower } = require('../model/commands');
const router = express.Router();

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    let result = await getCocktailPrice();
    res.status(result.status).json(result.data);
  }),
);

router.get(
  '/cocktails/:name/zutaten',
  asyncHandler(async (req, res) => {
    let result = await getCocktailIng(req.params.name);
    res.status(result.status).json(result.data);
  }),
);

router.get(
  '/cocktails/preis/:preis',
  asyncHandler(async (req, res) => {
    let result = await getCocktailPriceLower(req.params.preis);
    res.status(result.status).json(result.data);
  }),
);

module.exports = router;
