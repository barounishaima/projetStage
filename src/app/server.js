const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
// const db=require('../util/database.js');
const app = express();
const port = 3000;
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

 app.use(bodyParser.json());
// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_root_password',
  database: 'database',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


 
 app.get('/users',(req,res)=>{
      let qr= 'SELECT * FROM users';
      db.query(qr,(err,result)=>{
        if(err)
        {
          console.log(err,'errs')
        }
        if(result.length>0){
          res.send({
            message:'all users data',
            data:result
          });
        }

      });
 });
 
 app.get('/orders',(req,res)=>{
  console.log('Received a request to /orders');
  let qr= 'SELECT *FROM orders';
  db.query(qr,(err,result)=>{
    if(err)
    {
      console.log(err,'errs')
    }
    if(result.length>0){
      res.send({
        message:'all orders data',
        data:result
      });
    }

  });
});
app.get('/stock',(req,res)=>{
  console.log('Received a request to /stock');
  let qr= 'SELECT * FROM stock';
  db.query(qr,(err,result)=>{
    if(err)
    {
      console.log(err,'errs')
    }
    if(result.length>0){
      res.send({
        message:'all stock data',
        data:result
      });
    }

  });
});

//number of users
app.get('/users/count', (req, res) => {
  let qr = 'SELECT COUNT(*) as count FROM users';
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, 'errs');
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const count = result[0].count;
    res.send({
      message: 'Total number of users',
      count: count,
    });
  });
});
//orders count
app.get('/orders/count', (req, res) => {
  let qr = 'SELECT COUNT(*) AS orderCount FROM orders';
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const orderCount = result[0].orderCount;
    res.status(200).json({ orderCount });
  });
});
//stock count 
app.get('/stock/count', (req, res) => {
  let qr = 'SELECT COUNT(*) AS stockCount FROM stock';
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const stockCount = result[0].stockCount;
    res.status(200).json({ stockCount });
  });
});
  app.get('/',(req,res)=>{
   let qr= 'SELECT *FROM users';
  db.query(qr,(err,result)=>{
    if(err)
    {
      console.log(err,'errs')
    }
    if(result.length>0){
      res.send({
        message:'all users data',
        data:result
      });
    }

  });
});
// Delete user by ID
app.delete('/users/:firstname', (req, res) => {
  const firstname = req.params.firstname;
  const qr = `DELETE FROM users WHERE firstname = ?`;

  db.query(qr, [firstname], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.send({
      message: 'User deleted successfully',
    });
  });
});
// Delete stock by itemId
app.delete('/stock/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const qr = `DELETE FROM stock WHERE itemId = ?`;

  db.query(qr, [itemId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.send({
      message: 'item deleted successfully',
    });
  });
});
// Delete order by orderId
app.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const qr = `DELETE FROM orders WHERE orderId = ?`;

  db.query(qr, [orderId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.send({
      message: 'order deleted successfully',
    });
  });
});
//userdata
app.get('/users/:firstname/:lastname', (req, res) => {
  console.log('Received a request to /users');

  const { firstname, lastname } = req.params;
  console.log('First Name:', firstname, 'Last Name:', lastname);
  let qr = 'SELECT firstname, lastname FROM users WHERE firstname = ? AND lastname = ?';

  db.query(qr, [firstname, lastname], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length > 0) {
      res.send({
        message: 'user data',
        data: result
      });
    } else {
      res.send({
        message: 'No user found with the specified name'
      });
    }
  });
});
//finallogin
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received request with Email:', email, 'Password:', password);
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      // User found
      res.status(200).json({ message: 'Login successful' });
      
    } else {
      // User not found
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});




 app.post('/users', (req, res) => {
  res.send(req.body);

  const { firstname, lastname, email, phonenumber, password } = req.body;

  let qr = 'INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUES (?, ?, ?, ?, ?)';

  db.query(qr, [firstname, lastname, email, phonenumber, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log(result, 'result');
    res.send({
      message: 'data inserted',
    });
  });
});
app.post('/orders', (req, res) => {
  const { orderId, Date, Customer, destination, Items } = req.body;

  const qr = 'INSERT INTO orders (orderId, Date, Customer, destination, Items) VALUES (?, ?, ?, ?, ?)';

  db.query(qr, [orderId, Date, Customer, destination, Items], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log(result, 'result');
    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertId, 
    });
  });
});
app.post('/stock', (req, res) => {
  const { itemId, name, quantity } = req.body;


  const qr = 'INSERT INTO stock (itemId, name, quantity) VALUES (?, ?, ?)';

  
  db.query(qr, [itemId, name, quantity], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    console.log(result, 'result');
    res.status(201).json({
      message: 'item created successfully',
      itemId: result.insertId, 
    });
  });
});

//update
app.put('/users/email', (req, res) => {
  console.log(req.body, 'update data');
  let Getemail = req.params.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let phonenumber = req.body.phonenumber;
  let password = req.body.password;

  // Use backticks for column names, and use placeholders to prevent SQL injection
  let qr = `UPDATE users SET firstname=?, lastname=?, email=?, phonenumber=?, password=? WHERE email=?`;

  db.query(qr, [firstname, lastname, email, phonenumber, password, Getemail], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.send({
      message: 'data updated',
    });
  });
});
//delete
app.delete('/orders/orderId',(req,res)=>{
  let orderId = req.params.orderId;
  let qr = `DELETE FROM orders WHERE orderId='${orderId}'`;
  db.query(qr,(err,result)=>{
    if(err){
      console.log(err);
    }
    res.send({
      message:'data deleted',
    });
  });
});

app.options('*', cors());
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});