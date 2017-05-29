const assert = require('assert')
const User = require('../src/user')

describe('Reading records out of DB', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

	it('finds all users with name of Joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        console.log(users)
        assert(users.length === 1);
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
	});

  it('finds user by ID', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        console.log(user)
        assert(user.name === 'Joe');
        done();
      });
  });
});
