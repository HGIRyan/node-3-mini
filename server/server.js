const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config()
const session = require('express-session');
const messagesCrtl = require('./messages_ctrl')
let {SERVER_PORT, SECRET} = process.env;

const app = express()


app.use(bodyParser.json());
app.use(express.statis(__dirname + '/../build'))
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use((req, res, next) => {
    let badWords = ['a','i','o','u','e'];
    if (req.body.message) {
      let badWordsExist = true;
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '*');
      }
      next();
    } else {
      next();
    }
  });

app.get('/api/messages', messagesCrtl.getAllMessages)
app.get('/api/history', messagesCrtl.history)
app.post('/api/messages', messagesCrtl.createMessages)





app.listen(SERVER_PORT, ()=>{console.log(`I have ${SERVER_PORT} popsicles`)})