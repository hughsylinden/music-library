const getDb = require('../services/db');

async function create(req, res) {
  const db = await getDb();
  const { name, genre } = req.body;
  try {
    const [databaseResponse] = await db.query('INSERT INTO Artist (name,genre) VALUES (?, ?)', [
      name,
      genre,
    ]);
    res.status(201).json({ name, genre, id: databaseResponse.insertId });
  } catch (err) {
    res.sendStatus(500);
  }
  db.close();
}

async function read(req, res) {
  const db = await getDb();
  try {
    const [artists] = await db.query(`SELECT * FROM Artist`);
    res.status(200).json(artists);
  } catch (err) {
    res.sendStatus(404);
  }
  db.close();
}

async function readOne(req, res) {
  try {
    const db = await getDb();
    const [artists] = await db.query('SELECT * FROM Artist WHERE id=?', [
      req.params.artistId,
    ]);
    if (artists[0]) {
      res.status(200).json(artists[0]);
    } else {
      res.sendStatus(404);
    }
    db.close();
  } catch (err) {
    res.sendStatus(500);
  }
}

async function update(req, res) {
  const db = await getDb();
  const data = req.body;
  const { artistId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE Artist SET ? WHERE id = ?',
      [data, artistId]
    );

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  db.close();
}

async function destroy(req, res) {
  try {
    const db = await getDb();

    const [artists] = await db.query('DELETE FROM Artist WHERE id=?', [
      req.params.artistId,
    ]);
    if (artists.affectedRows == 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(artists);
    }
    db.close();
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = { create, read, readOne, update, destroy };
