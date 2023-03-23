const express = require('express');
const app = express();
const port = 4000;
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./routes/routes')(app);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, XRequested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(port, (err) => {
    //Error first
    if(err) console.log(`Algo salio mal ${err}`);
    console.log(`Inicio el servidor en el puerto ${port}`);
});