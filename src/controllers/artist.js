const getDb = require('../services/db');

async function create(req, res) {
  const db = await getDb();
  try{
    await db.query('INSERT INTO Artist (name,genre) VALUES (?, ?)', [
      req.body.name,
      req.body.genre
    ]);
    res.status(201).send(`Artist '${req.body.name}' added`);
  }catch(err){
    res.sendStatus(500);
  }
  db.close();
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
}

async function readOne(req, res) {
  try{
    const db = await getDb();
    const [artists] = await db.query('SELECT * FROM Artist WHERE id=?', [
      req.params.artistId
    ]);
    if(artists[0]){
      res.status(200).json(artists[0]);
    }else{
      res.sendStatus(404);
    }    
    db.close();
  }catch(err){
    res.sendStatus(500);
  }
}

async function update(req, res) {
  try{
    const db = await getDb();
    const [[artists]] = await db.query('SELECT * FROM Artist WHERE id=?', [
      req.params.artistId
    ]);
    const data = {
      name: req.body.name,
      genre: req.body.genre
    }
    if(artists){
      await db.query('UPDATE Artist SET ? WHERE id = ?', [
        data,
        req.params.artistId
      ]);

      res.status(200).json(artists);
    }else{
      res.sendStatus(404);
    }    
    db.close();
  }catch(err){
    res.sendStatus(500);
  }
}

async function destroy(req, res) {
  try{
    const db = await getDb();

    const [artists] = await db.query('DELETE FROM Artist WHERE id=?', [
      req.params.artistId
    ]);
    if(artists.affectedRows==0){
      res.sendStatus(404);
    }else{
      res.status(200).json(artists);
    }  
    db.close();
  }catch(err){
    res.sendStatus(500);
  }
}

module.exports = { create, read, readOne, update, destroy };
