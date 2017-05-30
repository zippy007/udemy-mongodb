const assert = require('assert')
const User = require('../src/user')

describe('Updating a user', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it ('model instance set & save', (done) => {
    // Single instance set & save of multiple properties
    joe.set('name','Alex');
    assertName(joe.save(), done);
  });

  it ('model instance update', (done) => {
    // Update single instance
    assertName(joe.update({ name: 'Alex'}), done);
  });

  it ('model class update', (done) => {
    // Update single instance
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex'}),
      done
    );
  });

  it ('model class findOneAndUpdate', (done) => {
    // Update a single record by attribute
    assertName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex' }),
      done
    );
  });

  it ('model class findByIdAndUpdate', (done) => {
    // Find and Update a single record by id
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  it ('User has likes incremented by 10', (done) => {
    // Find and Update a single record by id
    User.update({ name: 'Joe'}, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });

});
