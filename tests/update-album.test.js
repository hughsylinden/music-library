const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album and assign to artist', () => {
  let db;
  let albums;
  let artists;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Oasis',
        'rock'
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Pink Floyd',
        'rock'
      ])
    ]);   
    [artists] = await db.query('SELECT * FROM Artist');
    await Promise.all([
      db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
        'Animals',
        1977,
        artists[1].id
      ])
    ]); 
    [albums] = await db.query('SELECT * FROM Album');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('/album', () => {
    describe('put', () => {
      it('updates an album in the database', async () => {
        const res = await request(app).patch(`/album/${albums[0].id}`).send({
          name: 'Animals',
          year: 1988
        });

        expect(res.status).to.equal(200);

        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE name = 'Animals'`
        );
        expect(albumEntries.name).to.equal('Animals');
        expect(albumEntries.year).to.equal(1988);
        expect(albumEntries.artistId).to.equal(albums[0].artistId);
      });      
    });
  });
});
