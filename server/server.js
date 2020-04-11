require('../config/config');
const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/users.route'));

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log(colors.red(`Have a error to connect mongo db ${process.env.URL_DB}`));
        console.log(err);
    } else {
        console.log(colors.green(`Connect to mongo db ${process.env.URL_DB}`));
    }
});

app.listen(process.env.PORT, () => {
    console.log(colors.blue(`Start Express Server in port ${process.env.PORT}`));
});

