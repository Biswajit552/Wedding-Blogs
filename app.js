const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
var cons = require('consolidate');
const hostname = '127.0.0.1';

main().catch(err => console.log(err));
//Data_base connect
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wedding');
}
//Schema
const kittySchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
});
//model
const Kittenn = mongoose.model('Wedding-Data', kittySchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// ENDPOINT
app.get('/', (req, res) => {
    res.status(200).render('index.html');
});
app.get('/signup.html', (req, res) => {
    res.status(200).render('signup.html');
});

app.get('/wedding.html', (req, res) => {
    res.status(200).render('wedding.html');
});
app.get('/contact.html', (req, res) => {
    res.status(200).render('contact.html');
});

// //made by me!!!!
app.post("/contact", async (req, res) => {
    const data = new Kittenn({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
    });
    await data.save();
    res.status(200).render('contact');
});
// // LOGIN POST
// app.post('/signup', async (req, res) => {

//     const data = new kit({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     await data.save();
//     res.status(200).render("login");
// });

// //login
// app.post('/login', async (req, res) => {
//         const check = await kit.findOne({ name: req.body.name})
//          console.log(check);
//         if (check.password == req.body.password) {
//             console.log("corret");
//             // res.status(200).render("index", `${req.body.name}+${req.body.password}`)
//             res.status(200).render("index");
//         }
//         else {
//             res.send("incorrect password")
//         }
// });

// START THE SERVER
app.listen(port, hostname, () => {
    console.log(`The application started successfully at http://${hostname}:${port}/`);
});
