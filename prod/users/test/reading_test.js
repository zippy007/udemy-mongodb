const assert = require('assert')
const User = require('../src/user')

describe('Reading records out of DB', () => {

  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    Promise.all([
      alex.save(),
      joe.save(),
      maria.save(),
      zach.save()
      ])
      .then(() => done());
  });

	it('finds all users with name of Joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users.length === 1);
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
	});

  it('finds user by ID', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit the result set', (done) => {

    User.find({})
      .sort({ name: 1 })   // Sort Ascendin. -1 is descending.
      .skip(1)            // Skip 1st record
      .limit(2)           // Only results
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
    });
  });
});
