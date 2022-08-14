require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/products');
var transactionRouter = require('./routes/transaction');
var cors = require('cors');
var app = express();
const swaggerUi = require('swagger-ui-express')
,swaggerDocument = require('./swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
)
app.use(logger('dev'));
app.use(bodyParser.json(),
    // '/api-docs',
    // swaggerUi.serve,
    // swaggerUi.setup(swaggerDocument)
);
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/transaction', transactionRouter);

module.exports = app;
