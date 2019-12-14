import request from 'supertest';
import app, { API_TOKEN } from './server';

const MADONNA_ID = '1DWWb4Q39mp1T3NgyscowF';
const THRILLER_ID = '2ANVost0y2y52ema1E9xAZ';

const ALBUM_IDS = [
  MADONNA_ID,
  THRILLER_ID,
];

describe('server.js', () => {
  let response;

  describe('/api/login', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/login')
        .end((err, res) => {
          response = res;
          done();
        });
    });

    it('should 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should include the API token', () => {
      expect(
        response.body.token
      ).toEqual(API_TOKEN);
    });
  });

  describe('/api/albums', () => {
    describe('authenticated', () => {
      beforeEach((done) => {
        request(app)
          .get('/api/albums?ids=' + ALBUM_IDS.join(','))
          .set('Authorization', `Bearer ${API_TOKEN}`)
          .end((err, res) => {
            response = res;
            done();
          });
      });

      it('should 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('should return two results', () => {
        expect(
          response.body.length
        ).toBe(2);
      });

      describe('"Thriller"', () => {
        let album;

        beforeEach(() => {
          album = response.body.find((a) => a.id === THRILLER_ID);
          expect(album).toBeDefined();
        });

        it('should contain tracks', () => {
          expect(album.tracks.length).toEqual(9);
        });

        it('should contain `artist` object', () => {
          expect(
            album.artist
          ).toEqual(
            { name: 'Michael Jackson', id: '3fMbdgg4jU18AjLCKBhRSm' },
          );
        });

        it('should contain `year`', () => {
          expect(album.year).toBe('1982');
        });

        it('should `imageUrl`', () => {
          expect(
            album.imageUrl
          ).toEqual(
            'https://i.scdn.co/image/5d17bbfcc752bcf58255dd564585597b0f5274e3'
          );
        });

        it('should contain `name`', () => {
          expect(album.name).toBe('Thriller');
        });
      });
    });

    describe('not authenticated', () => {
      beforeEach((done) => {
        request(app)
          .get('/api/albums?ids=' + ALBUM_IDS.join(','))
          .end((err, res) => {
            response = res;
            done();
          });
      });

      it('should 403', () => {
        expect(
          response.statusCode
        ).toBe(403);
      });
    });
  });

  describe('/api/check_token', () => {
    describe('with valid token', () => {
      beforeEach((done) => {
        request(app)
          .get('/api/check_token')
          .set('authorization', `Bearer ${API_TOKEN}`)
          .end((err, res) => {
            response = res;
            done();
          });
      });

      it('should 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('should return `valid` as true', () => {
        expect(response.body.valid).toBe(true);
      });
    });

    describe('with invalid token', () => {
      beforeEach((done) => {
        request(app)
          .get('/api/check_token')
          .set('authorization', 'Bearer INVALID_TOKEN')
          .end((err, res) => {
            response = res;
            done();
          });
      });

      it('should 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('should return `valid` as false', () => {
        expect(response.body.valid).toBe(false);
      });
    });

    describe('with no token at all', () => {
      beforeEach((done) => {
        request(app)
          .get('/api/check_token')
          .end((err, res) => {
            response = res;
            done();
          });
      });

      it('should 400', () => {
        expect(
          response.statusCode
        ).toBe(400);
      });

      it('should return `valid` as `false`', () => {
        expect(
          response.body.valid
        ).toBe(false);
      });
    });
  });
});
