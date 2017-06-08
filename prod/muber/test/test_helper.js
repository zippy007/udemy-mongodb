const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
  .once('open', () => done())
  .on('error', err => {
    console.warn('Warning', error);
  });

  beforeEach(done => {
    const { drivers } = mongoose.connection.collections;

    drivers.drop()
      // Force index recreation as dropping will remove them all.
      .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
      .then(() => done())
      .catch(() => done());
  });
});
