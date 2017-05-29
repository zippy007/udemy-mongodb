const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
  // .once('open', () => console.log('Good to go !'))
    .once('open', () => { done(); })
    .on('error', (error) => {
  	   console.warn('Error', error)
     });
});

beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		//Ready to run next test !
		done();
	});
});
