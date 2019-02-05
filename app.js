require('./model.js')
var express = require('express')
var app = express()

var session = require('express-session')
app.use(session({
	secret: "Its secret", resave: false,
	saveUninitialized: true,
}))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('./node_modules/bootstrap/dist/'))
app.use(express.static('./node_modules/jquery/dist/'))
app.use(express.static('./node_modules/angular/'))
app.use('/uploads',express.static('./uploads/'))


app.use('/', require('./routers/adminRouter'))

const port = 8888
app.listen(port, (err) => {
	if (err) throw err;
	console.log(`App runs on http://localhost:${port}`)
})