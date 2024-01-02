const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const mysqlCon = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'productdb'
});

mysqlCon.connect((err)=>{
    if(err){
        console.log("Error in DB connection",err);
    }else{
        console.log("DB connected successfully");
    }
});

mysqlCon.query(
    "CREATE TABLE IF NOT EXISTS phoneProduct(p_id INT AUTO_INCREMENT PRIMARY KEY, p_name VARCHAR(20) NOT NULL,p_cost INT)",
    (err)=>{
        if(err){
            console.log("Error in creating the table",err);
        }else{
            console.log("Table created");
        }
    }
);

app.post('/insert',(req,res)=>{
    const {p_name, p_cost} = req.body;

    mysqlCon.query(
        "INSERT INTO phoneProduct (p_name,p_cost) VALUES(?,?)",
        [p_name,p_cost],

        (err)=>{
            if(err){
                console.log("Error in inserting the data",err);
                res.status(500).send("Internal server error");
            }else{
                console.log("Data successfully inserted");
                res.status(201).send("Data successfully inserted");
            }
        }
    );
})

app.get('/fetch',(req,res)=>{

    mysqlCon.query(
        "SELECT * FROM phoneProduct",
        (err,results)=>{
            if(err){
                console.log("Error in to get data",err);
                res.status(500).send("Error in to get data");
            }else{
                console.table(results);
                res.status(201).json(results);
            }
        }
    )
});

app.listen(3005, () => console.log('Express server is running on port 3001'));