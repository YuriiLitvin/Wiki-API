const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/wikiDb");
}

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get("/", function(req, res) {
  res.send("<h1>Hello everyone!</h1>");
});
















app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
