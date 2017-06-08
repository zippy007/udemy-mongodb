const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('Drivers Controller', (done) => {

  it('POST to /api/drivers creates new Driver', (done) => {

    console.log('Create Driver Test');
    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end((err, response) => {

        Driver.count().then(newCount => {
          assert(count + 1 === newCount);
          done();
        });
      });
    });
  });

  it('PUT to /api/drivers/id edits a Driver', (done) => {

    console.log('Edit Driver Test');
    const driver = new Driver({ email: 't@t.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {

          Driver.findOne({ email: driver.email })
            .then(driver => {
                assert(driver.driving === true);
                done();
            });
        });
    });
  });

  it('DELETE to /api/drivers/id deletes a Driver', (done) => {

    console.log('Delete Driver Test');
    const driver = new Driver({ email: 't@t.com', driving: false });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {

          Driver.findOne({ email: driver.email })
            .then((driver) => {
                assert(driver === null);
                done();
            });
        });
    });
  });

  it('GET to /api/drivers finds a Driver in a location', (done) => {

    console.log('Find Driver Test');

    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [ -122.4759902, 47.6147628 ]
      }
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [ -80.253, 25.791 ]
      }
    });

    Promise.all([ seattleDriver.save(),
                  miamiDriver.save() ])
        .then(() => {
          request(app)
            .get('/api/drivers?lng=-80&lat=25')
            .end((err, response) => {
              assert(response.body.length === 2);
              assert(response.body[0].obj.email === 'miami@test.com');
              done();
            });
        });
    });

});
