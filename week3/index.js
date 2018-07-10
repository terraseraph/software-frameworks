const express = require("express")
const app = express()
const http = require("http").Server(app)
const routes = require('./controllers/routes')
const bodyParser = require('body-parser')


app.use(express.static(__dirname+'/www'));
app.use(express.static(__dirname+'/node_modules'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.urlencoded());

//cloud9 vars
var port = process.env.PORT
var host = process.env.IP

var server = http.listen(port, function () {
    console.log(`My First Nodejs Server!`);
    console.log(`Server listening on: Host : ${host}  Port: ${port}`);
});

app.get('/test', routes.test_route)

app.get('/get_data', routes.get_data)

app.post('/login', routes.send_login)