const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {

  // setsu maptpting to call method greeting for HTTP GET
  // request to '/api' Route.
   app.get('/api', DriversController.greeting);
   app.post('/api/drivers', DriversController.create);
   app.put('/api/drivers/:id', DriversController.edit);
   app.delete('/api/drivers/:id', DriversController.delete);
   app.get('/api/drivers', DriversController.index);
};
