const assert = require('assert')
const User = require('../src/user')

describe('Updating a user', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it ('model instance set & save', (done) => {
    // Single instance update
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it ('class method remove', (done) => {
    // Remove a number of records wth criteria
    User.remove({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it ('class method findOneAndRemove', (done) => {
    // Remove a single record
    User.findOneAndRemove({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it ('class method findByIdAndRemove', (done) => {
    // Find and Remove a single record by id
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

});
