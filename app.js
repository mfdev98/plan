console.log("Web serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express();

//MongoDB chaqirish
const db = require("./server").db();

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Session
// 3: Views code            
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code           
app.get("/", function (req, res) {
    res.render("reja");
});

module.exports = app;