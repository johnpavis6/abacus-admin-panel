var express = require('express')
var app = express.Router()

var bodyParser = require('body-parser')
parseForm = bodyParser.urlencoded({
	extended: true
})
app.use(bodyParser.json())

var controller = require('../controllers/adminController');
var middleware = require('../middlewares/adminMiddleware');

var multer = require('multer');
var storage = multer.diskStorage({
	destination: './uploads',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.png')
	}
});
var upload = multer({ storage: storage });

app.get('/', (req, res) => {
	res.render('home')
})
app.post('/login', parseForm, controller.login)

app.get('/logout', controller.logout)

app.get('/tech', middleware.tech, controller.tech)
app.get('/non-tech', middleware.non_tech, controller.non_tech)
app.get('/workshop', middleware.workshop, controller.workshop)

app.post('/tech/events', middleware.tech, controller.techs)
app.post('/non-tech/events', middleware.non_tech, controller.non_techs)
app.post('/workshop/events', middleware.workshop, controller.workshops)

app.post('/tech/save', parseForm, upload.single('image'), middleware.tech, controller.tech_save)
app.post('/non-tech/save', parseForm, upload.single('image'), middleware.non_tech, controller.non_tech_save)
app.post('/workshop/save', parseForm, upload.single('image'), middleware.workshop, controller.workshop_save)

app.post('/tech/remove', parseForm, middleware.tech, controller.tech_remove)
app.post('/non-tech/remove', parseForm, middleware.non_tech, controller.non_tech_remove)
app.post('/workshop/remove', parseForm, middleware.workshop, controller.workshop_remove)

module.exports = app