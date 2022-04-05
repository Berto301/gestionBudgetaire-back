require('dotenv').config();
var app = require('./app');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { HOST, PORT, DB} = require('./app/config/db.config');
const PORT_BACK = process.env.PORT
const db = require('./app/models');
db.mongoose
  .connect(`mongodb://${HOST}:${PORT}/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });


  app.set('socket', io);
  http.listen(PORT_BACK, () => {
    console.log('\u{1F525} Server is running on port', PORT_BACK, '\u{1F525}');
  });