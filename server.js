const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions)) // Use this after the variable declaration
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
    user: 'testing',
    password: 'Pruebas%ALI%2020',
    database: 'testing_ali_fullstack'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/api', routes)

var mysql_pool  = mysql.createPool(dbOptions);

app.get('/api/status-table',function(req,res) {
	console.log('API CALL: /api/status');
	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}
	    connection.query('SELECT * FROM users_test_kevin_joel_martinez_meraz', function(err2, rows, fields) {	
	    	if (err2) {
				let data = { "Time":"", "DatabaseStatus":"" ,"Message":""};
				data["Time"] = (new Date()).getTime();
				data["DatabaseStatus"] = "Down";
				data["Message"]="Error";
				res.json(data); 
			} else {
				let data={"Message":""};
				data["Message"]="Success";
				res.json(data); 
			}
			connection.release();
	    });
	});
});
app.get('/api/create-table',function(req,res) {
	console.log('API CALL: /api/create-table');
	var retvalSettingValue = "?";
	mysql_pool.getConnection(function(err, connection) {
		if (err) {
			connection.release();
	  		console.log(' Error getting mysql_pool connection: ' + err);
	  		throw err;
	  	}
		connection.query("DROP TABLE IF EXISTS `testing_ali_fullstack`.`users_test_kevin_joel_martinez_meraz`; ", (err, rows)=>{
            if(err) return res.send(err)

            // res.send('table dropped!')
			connection.query("CREATE TABLE `testing_ali_fullstack`.`users_test_kevin_joel_martinez_meraz` ( `id` INT NOT NULL AUTO_INCREMENT , `nombre` VARCHAR(50) NOT NULL , `segundoNombre` VARCHAR(50) NOT NULL , `apellidoPaterno` VARCHAR(100) NOT NULL , `apellidoMaterno` VARCHAR(100) NOT NULL , `fechaNacimiento` VARCHAR(50) NOT NULL , `email` VARCHAR(200) NOT NULL , `telefono` VARCHAR(16) NOT NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM; ", (err, rows)=>{
				if(err) return res.send(err)

				// res.send('create-table added!')
				let data={"Message":""};
				data["Message"]="create-table added!";
				res.json(data);
				connection.release();
			})
		})
	});
});



// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})