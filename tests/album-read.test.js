const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read artist', () => {
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
      ]),
      db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
        'Dark Side of The Moon',
        1973,
        artists[1].id
      ]),
      db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
        'Definitely Maybe',
        1994,
        artists[0].id
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
    describe('GET', () => {
      it('returns all album records in the database', async () => {
        const res = await request(app).get('/album').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((albumRecord) => {
          const expected = albums.find((a) => a.id === albumRecord.id);

          expect(albumRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/album/:albumId', () => {
    describe('GET', () => {
      it('returns a single album with the correct id', async () => {
        const expected = albums[0];
        const res = await request(app).get(`/album/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app).get('/album/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});