require('dotenv').config();

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const PORT = process.env.PORT || 4010;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app
  .use(express.json())
  .use(cors())
  .use(bodyParser.urlencoded({
    extended: true
  }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('strictQuery', true);

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

app.use('/api', registerRouter);
app.use('/api', loginRouter)