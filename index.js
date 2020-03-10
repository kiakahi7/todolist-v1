const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
let weekdayItems = ["Show Up", "Get Settled","Get Cracking", "Punch Out","Lock Up"];
let weekendItems = ["Go to Sleep", "Wake Up", "Eat", "Train/Work Out", "Watch a Movie", "Go to Sleep Again"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    let day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});
    
});

app.post("/", function(req, res) {

    let item = req.body.newItem;
    
    if (req.body.list === "Weekday") {
        weekdayItems.push(item);
        res.redirect("/weekday");
    };
    else if (req.body.list === "Weekend") {
        weekendItems.push(item);
        res.redirect("/weekend");
    };    
    else {
        items.push(item);
        res.redirect("/");
    };
});

app.get("/weekday", function(req, res){
    res.render("list", {listTitle: "Weekday To Do List", newListItems: weekdayItems});
});

app.get("/weekend", function(req, res){
    res.render("list", {listTitle: "Weekend To Do List", newListItems: weekendItems});
});


app.listen(3000, function() {
console.log ("Server is running on port 3000");
});
