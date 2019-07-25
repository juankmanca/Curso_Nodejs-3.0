//Requires
require('./config/config');
const express = require('express')
const app = express ()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
var session = require('express-session')
var MemoryStore = require('memorystore')(session)

//Paths
const dirPublic = path.join(__dirname, "../public")
const dirNode_modules = path.join(__dirname , '../node_modules')

//Static
app.use(express.static(dirPublic))
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

//Session
app.use(session({
	cookie: { maxAge: 86400000 },
 	store: new MemoryStore({
      	checkPeriod: 86400000 // prune expired entries every 24h
    	}),
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true
}))

  //middleware
app.use((req,res,next)=>{
	if(req.session.usuario){
		res.locals.sesion = true
		res.locals.nombre = req.session.nombre
		res.locals.coordinador = req.session.coordinador 
		res.locals.aspirante = req.session.aspirante 
	}
	next();
})

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require('./routes/index.js'));

mongoose.connect(process.env.URLDB,{useNewUrlParser:true},(err,result)=>{
	if(err){
		return console.log(err); 
	}
	console.log('conectado a mongodb');
})


app.listen(process.env.PORT, () => {
	console.log ('servidor en el puerto ' + process.env.PORT)
 });

	