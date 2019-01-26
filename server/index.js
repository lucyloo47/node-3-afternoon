const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('session');
require ('dotenv').config();

const checkForSession = require('./middlewares/checkForSession')

const swag_controller = ('./controllers/swag_controller');
const auth_controller = ('./controllers/auth_controller');
const cart_controller = ('./controllers/cart_controller');
const search_controller = ('./controllers/search_controller');

let {SESSION_PORT, SESSION_SECRET} = process.env;

const app = express();

app.use (bodyParser.json());
app.use (session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

app.post('/api/cart', cart_controller.add);
app.post('/api/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get('/api/search', search_controller.search);



app.listen(SESSION_PORT, () => {
    console.log(`Server listening on port ${SESSION_PORT}.`);
});