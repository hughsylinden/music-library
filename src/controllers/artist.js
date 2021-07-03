const getDb = require('../services/db');

async function create(req, res) {
  try{
    const db = await getDb();
    await db.query(`INSERT INTO Artist (name,genre) VALUES ('${req.body.name}', '${req.body.genre}');`);
    res.status(201).send(`Artist '${req.body.name}' added`);
    db.close();
  }catch(err){
    res.sendStatus(500);
  }
}

async function read(req, res) {
  try{
    const db = await getDb();
    const [artists] = await db.query(`SELECT * FROM Artist;`);
    res.status(200).json(artists);
    db.close();
  }catch(err){
    res.sendStatus(500);
  }
  res.sendStatus(200);
}

module.exports = { create, read };
