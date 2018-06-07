const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger("Morgan enebled...");
}

//db work
dbDebugger("Connected to DB");

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));