const express = require('express');
const mysql =require('mysql');
const bodyparser =require('body-parser');
const port=10000;
const app = express();

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
});

app.set('view engine', 'ejs');
    app.use(bodyparser.urlencoded({ extended:true}));
    app.use(bodyparser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monday'
});
db.connect(err=>{
    if(err)throw err;
    
    console.log('connected to database');



})
app.get('/insert', (req, res)=>{
    res.render('index');

})
app.get('/', (req, res)=>{
    const select ="SELECT * FROM user";
    db.query(select, (err, result)=>{
        if(err)throw err;
        res.render('view', {users:result});
    })
})
app.post('/insert', (req, res)=>{
    const {usernames, password,gmail} = req.body;
     const sql = "INSERT INTO user (usernames, password, gmail) VALUES(?, ?, ?)";

db.query(sql,[ usernames,password,gmail ],(err, result)=>{
    if(err)throw err;
    res.redirect('/');

})
});


app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql,[id],(err,results)=>{
        if (err) throw err;
        res.render('edit',{ edit:results });
    })
})


app.post('/insert',(req,res)=>{
    const { usernames,gmail,password } = req.body;
    if({ usernames,gmail,password } == ''){
        res.redirect('/insert');
        return;
    }else{
        const sql = "INSERT INTO users (username,email) VALUES(?, ?)";
        db.query(sql,[ usernames,gmail,password ], (err,results)=>{
            if(err)throw err;
            res.redirect('/');        
        })
    }
})

