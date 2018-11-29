require('./model.js')
var express = require('express')
var app = express()

var bodyParser = require('body-parser')
parseForm = bodyParser.urlencoded({ extended: true })

var session = require('express-session')
app.use(session({
    secret: "Its secret", resave: false,
    saveUninitialized: true,
}))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('./node_modules/bootstrap/dist/'))
app.use(express.static('./node_modules/jquery/dist/'))

app.get('/', (req, res) => {
	res.redirect('/admin')
})
app.use('/admin',require('./routers/adminRouter'))

const port = 80, host = '0.0.0.0'
app.listen(port, host, (err) => {
	if (err) throw err;
	console.log(`App runs on http://${host}:${port}`)
})