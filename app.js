const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const saltNumber = 10;
const ejs = require("ejs");
mongoose.connect("mongodb+srv://admin_muhammad:1991992@cluster0.2rmwq.mongodb.net/MyUsers_");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var secondEmail;

const messageSchema = new mongoose.Schema({
    email: String
})
const Message = mongoose.model("Message", messageSchema);

const message = new Message({
    email: ""
})
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    semail: [messageSchema]
})

const USER = mongoose.model("USER", userSchema);



app.get("/", (req, res) => {
    res.render("home")
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/signin", (req, res) => {
    res.render("signin")
});

app.get("/logout", (req, res) => {
    res.redirect("/")
});

app.get("/websit", (req, res) => {
    res.render("websit")
});




app.post("/signin", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    secondEmail = req.body.email;
    const password = req.body.password;
    USER.findOne({ email: email }, (err, find) => {
        if (!err)
            if (find) {
                res.render("error", { obError: "This account has already been logged in... You can login directly." })

            }
            else {
                bcrypt.hash(password, saltNumber, (err, hash) => {
                    const newUser = new USER({
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: hash,
                        semail: message
                    });
                    newUser.save((err) => {
                        if (!err) {
                            console.log("Successfuly Save New User");
                            res.render("websit",{obname:newUser.fname})
                        }
                        else console.log("Cant Save" + err);
                    });
                })
            }
        else res.send(err)
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    secondEmail = req.body.email;
    USER.findOne({ email: email }, (err, find) => {
        if (!err)
            if (find) {
                bcrypt.compare(password, find.password, (err, result) => {
                    if (result) res.render("websit",{obname:find.fname})
                    else res.render("error", { obError: "error in password" });
                });
            }
            else {
                res.render("error", { obError: "You are not logged in from this account previously, you can create a new account or log in with a previously registered account" })
            }
        else res.send(err)
    });
});



app.post("/statistical", (req, res) => {
    const email = req.body.email;
    const newEmail = new Message({
        email: email
    });
    newEmail.save((err) => {
        if (!err) {
            console.log("successfyly add email");
            USER.updateOne({ email: secondEmail }, { semail: newEmail }, (err) => {
            })

            res.redirect("/websit");
        }
        else console.log(err)
    })
})

app.post("/errorsign", (req, res) => {
    if (req.body.errorh1 === "This")
        res.redirect("/signin")
    else
        res.redirect("/login")

});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port,()=>{
    console.log("Started...")
})