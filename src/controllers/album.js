const getDb = require('../services/db');

async function create(req, res) {
  const db = await getDb();
  try {
    await db.query('INSERT INTO Album (name,year,artistId) VALUES (?, ?, ?)', [
      req.body.name,
      req.body.year,
      req.params.artistId,
    ]);
    res.status(201).send(`Album '${req.body.name}' added`);
  } catch (err) {
    res.sendStatus(500);
  }
  db.close();
}

async function read(req, res) {
  try {
    const db = await getDb();
    const [albums] = await db.query(`SELECT * FROM Album`);
    res.status(200).json(albums);
    db.close();
  } catch (err) {
    res.sendStatus(500);
  }
}

async function readOne(req, res) {
  try {
    const db = await getDb();
    const [[albums]] = await db.query('SELECT * FROM Album WHERE id=?', [
      req.params.albumId,
    ]);
    if (albums) {
      res.status(200).json(albums);
    } else {
      res.sendStatus(404).send('album does not exist');
    }
    db.close();
  } catch (err) {
    res.sendStatus(500);
  }
}

async function update(req, res) {
  const db = await getDb();
  const data = req.body;
  const { albumId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE Album SET ? WHERE id = ?',
      [data, albumId]
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

    const [albums] = await db.query('DELETE FROM Album WHERE id=?', [
      req.params.albumId,
    ]);
    if (albums.affectedRows == 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(albums);
    }
    db.close();
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = { create, read, readOne, update, destroy };
