const express =  require('express');
const mysql = require('mysql');
const config = require('config');
const appForBooks = express.Router();
var connection = mysql.createPool({
    host     : config.get("host"),
    user     : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
   });

   appForBooks.get("/", (request, response)=>{
    connection.query("select * from book", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

appForBooks.post("/", (request, response)=>{

console.log(request.body);
    var query = 
    `insert into book values(${request.body.id}, '${request.body.b_name}',${request.body.price},'${request.body.language}')`;
    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})


appForBooks.put("/:id", (request, response)=>{

    console.log(request.body);
        var query = 
        `insert into book values(${request.params.id}, '${request.body.b_name}',${request.body.price},'${request.body.language}')`;
        connection.query(query, (error, result)=>{
            if(error==null)
            {
                var data = JSON.stringify(result) 
                response.setHeader("Content-Type","application/json");
                response.write(data);
            } 
            else
            {
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.write(error)
            }
            response.end();
    })
    })
module.exports = appForBooks;