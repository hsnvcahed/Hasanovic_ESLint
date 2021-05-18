const db = require('../db');

async function getCocktailPrice() {
  console.log('TETS');

  let { rows } = await db.query('select cname, preis from cocktail;');
  return {
    status: 200,
    data: rows,
  };
}

module.exports = { getCocktailPrice };
