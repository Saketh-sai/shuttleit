var express = require('express');
var app=express();

var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'db4free.net',
  port: "3306",
  user: 'sakethsai',
  password: 'sanu2525',
  database: 'db4freemysqlisha',
  stream : 'http://proxy-bl3.in623.corpintra.net:3128',
    connectionLimit : 1000,
   connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
})

pool.getConnection(function(err) {
  if (err) console.log(err);
  //Select all customers and return the result object:
  
    console.log("connected");
        //		pool.end();
});


app.get('/',function(req,res)
{
res.send('Hello World!');

});



app.get('/getslots', function (req, res) {
	
	pool.query("SELECT SLOT,TIME_FORMAT(`START TIME`, '%h:%i %p') STARTTIME,TIME_FORMAT(`END TIME`, '%h:%i %p')ENDTIME,ISBOOKED,CODE FROM BADMINTON",function(error,results,fields){
		//if(error) throw error;
		if(error) console.log(error);
		res.send(results);
	});
	
});


app.get('/bookslots', function (req, res) {
	
	var id = req.query.id;
	id = parseInt(id);
	id += 1;
	console.log(id);
	
	
	pool.query("UPDATE BADMINTON SET ISBOOKED = IF(ISBOOKED != 1 , 1 , ISBOOKED) WHERE SLOT = ?",id,function(error,results,fields){
		if(error) console.log(error);
		//if(error) throw error;
		var  numRows = results.changedRows;
		//console.log(numRows);
		if(results.changedRows != 0 ){
			console.log("Yes");
			res.send("success");
		}else{
			res.send("Failure");
		}
		
	});
	
});



app.get('/users', function (req, res) {
   //connection.query("SELECT * FROM BADMINTON", function (err, result, fields) {
    
	pool.query('SELECT * FROM BADMINTON',function(error,results,fields){
		if(error) throw error;
		res.send(results);
	});
    //res.send("result");
 
});





var server=app.listen(3001,function() {});