const db = require('../db');

async function getCocktailPrice() {
  let { rows } = await db.query('select cname, preis from cocktail;');

  if (rows.length == 0) return { status: 404, data: 'Nicht gefunden' };
  return {
    status: 200,
    data: rows,
  };
}

async function getCocktailIng(cocktail) {
  let { rows } = await db.query(
    'select zbez from zutat join besteht b on zutat.zid = b.zid join cocktail c on b.cid = c.cid where c.cname = $1;',
    [cocktail],
  );

  if (rows.length == 0) return { status: 404, data: 'Nicht gefunden' };
  let tempArr = [];

  for (let i of rows) {
    tempArr.push(i.zbez);
  }
  return {
    status: 200,
    data: tempArr,
  };
}

async function getCocktailPriceLower(preis) {
  let { rows } = await db.query('select cname, preis from cocktail where preis <= $1 order by preis desc;', [
    preis,
  ]);

  if (rows.length == 0) return { status: 404, data: 'Nicht gefunden' };
  return {
    status: 200,
    data: rows,
  };
}

async function removeCocktail(name) {
  let { rows } = await db.query('select cid, cname from cocktail where cname = $1;', [name]);

  if (rows.length == 0) return { status: 404, data: 'Nicht gefunden' };

  db.query('delete from besteht where cid = (select cid from cocktail where cname = $1)', [name]);
  db.query('delete from bestellt where cid = (select cid from cocktail where cname = $1)', [name]);
  db.query('DELETE from cocktail where cname = $1', [name]);

  return {
    status: 200,
    data: 'Cocktail gelöscht',
  };
}

module.exports = { getCocktailPrice, getCocktailIng, getCocktailPriceLower, removeCocktail };
