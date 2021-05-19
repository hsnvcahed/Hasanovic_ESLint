const db = require('../db');

async function getCocktailPrice() {
  const { rows } = await db.query('select cname, preis from cocktail;');

  if (rows.length === 0) return { status: 404, data: 'Nicht gefunden' };
  return {
    status: 200,
    data: rows,
  };
}

async function getCocktailIng(cocktail) {
  const { rows } = await db.query(
    'select zbez from zutat join besteht b on zutat.zid = b.zid join cocktail c on b.cid = c.cid where c.cname = $1;',
    [cocktail],
  );

  if (rows.length === 0) return { status: 404, data: 'Nicht gefunden' };
  const tempArr = [];

  rows.forEach(el => tempArr.push(el.zbez))
  return {
    status: 200,
    data: tempArr,
  };
}

async function getCocktailPriceLower(preis) {
  const { rows } = await db.query('select cname, preis from cocktail where preis <= $1 order by preis desc;', [
    preis,
  ]);

  if (rows.length === 0) return { status: 404, data: 'Nicht gefunden' };
  return {
    status: 200,
    data: rows,
  };
}

async function removeCocktail(name) {
  const { rows } = await db.query('select cid, cname from cocktail where cname = $1;', [name]);

  if (rows.length === 0) return { status: 404, data: 'Nicht gefunden' };

  db.query('delete from besteht where cid = (select cid from cocktail where cname = $1)', [name]);
  db.query('delete from bestellt where cid = (select cid from cocktail where cname = $1)', [name]);
  db.query('DELETE from cocktail where cname = $1', [name]);

  return {
    status: 200,
    data: 'Cocktail gelöscht',
  };
}

async function addCocktail(name, preis, zubereitung, kateg, zubereitB, servierung) {
  const res = await db.query(
    'Insert into cocktail(cname, preis, zubereitung, kid, zgid, sgid) VALUES ($1,$2,$3,$4,$5,$6) returning cid;',
    [name, preis, zubereitung, kateg, zubereitB, servierung],
  );

  return {
    status: 200,
    data: 'Inserted ' + res.rows[0].cid,
  };
}

async function updateCocktailPrice(name, preis) {
  const res = await db.query('UPDATE cocktail set preis = $1 where cname = $2 returning preis', [preis, name]);

  return {
    status: 200,
    data: 'Updated to  ' + res.rows[0].preis,
  };
}

module.exports = {
  getCocktailPrice,
  getCocktailIng,
  getCocktailPriceLower,
  removeCocktail,
  addCocktail,
  updateCocktailPrice,
};
