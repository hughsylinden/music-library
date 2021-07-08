const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
  let db;
  let artists;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Pink Floyd',
        'rock',
      ])/* ,
      db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
        'Dave Brubeck',
        'jazz',
        1,
      ]) */
    ]);

    [artists] = await db.query('SELECT * FROM Artist');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/album', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const res = await request(app).post(`/artist/${artists[0].id}/album`).send({
          name: 'Animals',
          year: 1977,
          artistId: artists[0].id,
        });

        expect(res.status).to.equal(201);

        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE name = 'Animals'`
        );
        expect(albumEntries.name).to.equal('Animals');
        expect(albumEntries.year).to.equal(1977);
        expect(albumEntries.artistId).to.equal(artists[0].id);
      });
    });

    //check if artist is deleted, then album is deleted
    //check delete,put,get;
  });
});
