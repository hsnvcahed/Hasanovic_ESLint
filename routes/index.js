const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  getCocktailPrice,
  getCocktailIng,
  getCocktailPriceLower,
  removeCocktail,
  addCocktail,
  updateCocktailPrice,
} = require('../model/commands');
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

router.delete(
  '/cocktails/:name',
  asyncHandler(async (req, res) => {
    let result = await removeCocktail(req.params.name);
    res.status(result.status).json(result.data);
  }),
);

router.post(
  '/cocktails',
  asyncHandler(async (req, res) => {
    let result = await addCocktail(
      req.body.cname,
      req.body.preis,
      req.body.zubereitung,
      req.body.kid,
      req.body.zgid,
      req.body.sgid,
    );
    res.status(result.status).json(result.data);
  }),
);

router.patch(
  '/cocktails/preis',
  asyncHandler(async (req, res) => {
    let result = await updateCocktailPrice(req.body.cname, req.body.preis);
    res.status(result.status).json(result.data);
  }),
);

module.exports = router;
