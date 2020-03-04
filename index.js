//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
let workItems = ["Show Up", "Get Settled","Get Cracking", "Punch Out","Lock Up"];
let funItems = ["Go to Sleep", "Wake Up", "Eat", "Train/Work Out", "Watch a Movie", "Go to Sleep Again"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    let day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});
    
});

app.post("/", function(req, res) {

    let item = req.body.newItem;
    
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else if (req.body.list === "Fun") {
        funItems.push(item);
        res.redirect("/fun");
    }    
    else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work To Do List", newListItems: workItems})
});

app.get("/fun", function(req, res){
    res.render("list", {listTitle: "Fun To Do List", newListItems: funItems})
});


app.listen(3000, function() {
console.log ("Server is running on port 3000")
});
